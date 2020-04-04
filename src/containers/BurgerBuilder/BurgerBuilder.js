import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from '../../axios-orders';
import AuxContainer from '../../hoc/AuxContainer';
import Burger from '../../components/Burger';
import BurgerControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';

import * as actions from '../../store/actions';
import withErrorHandler from '../../hoc/withErrorHandler';

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const totalPrice = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector((state) => {
    return !!state.auth.token;
  });

  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredient = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  const { history } = props;

  useEffect(() => {
    onInitIngredient();
  }, [onInitIngredient]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    history.push('/checkout');
  };

  const disableInfo = {
    ...ings,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>This is your err</p> : <Spinner />;

  if (ings) {
    burger = (
      <AuxContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 100px)',
          }}
        >
          <Burger ingredients={ings} />
          <div style={{ marginTop: 'auto' }}>
            <BurgerControls
              ingredientAdded={onIngredientAdded}
              ingredientRemoved={onIngredientRemoved}
              disabled={disableInfo}
              purchasable={updatePurchaseState(ings)}
              isAuth={isAuthenticated}
              price={totalPrice.toFixed(2)}
              orderd={purchaseHandler}
            />
          </div>
        </div>
      </AuxContainer>
    );
    orderSummary = (
      <OrderSummary
        price={totalPrice.toFixed(2)}
        ingredients={ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <AuxContainer>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      <div>{burger}</div>
    </AuxContainer>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
