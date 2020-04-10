import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';

import configAxios from '../../utils/axios-orders';
import Burger from '../../components/Burger';
import BurgerControls from '../../components/Burger/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary';

import * as actions from '../../store/actions';
import withErrorHandler from '../../hoc/withErrorHandler';

const axios = configAxios();

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const totalPrice = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const isAuthenticated = useSelector((state) => {
    return !!state.auth.token;
  });

  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  const { history } = props;

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
    history.push('/checkout');
  };

  const disableInfo = {
    ...ings,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger;

  if (ings) {
    burger = (
      <React.Fragment>
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
      </React.Fragment>
    );
    orderSummary = <OrderSummary price={totalPrice.toFixed(2)} ingredients={ings} />;
  }
  return (
    <React.Fragment>
      <Modal
        closable={false}
        onOk={() => purchaseContinueHandler()}
        onCancel={() => purchaseCancelHandler()}
        centered
        okText='Continue'
        cancelText='Cancel'
        visible={purchasing}
      >
        {orderSummary}
      </Modal>
      <div>{burger}</div>
    </React.Fragment>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
