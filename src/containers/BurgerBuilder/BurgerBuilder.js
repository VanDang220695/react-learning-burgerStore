import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import AuxContainer from '../../hoc/AuxContainer';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';

import * as actionType from '../../store/actions';
import withErrorHandler from '../../hoc/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    puchasing: false,
    loading: false,
    error: false,
  };

  componentWillMount() {
    axios
      .get('https://react-my-burger-85174.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ puchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ puchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>This is your err</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <AuxContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 100px)',
            }}
          >
            <Burger ingredients={this.props.ings} />
            <div style={{ marginTop: 'auto' }}>
              <BurgerControls
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disableInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                price={this.props.totalPrice.toFixed(2)}
                orderd={this.purchaseHandler}
              />
            </div>
          </div>
        </AuxContainer>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice.toFixed(2)}
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <AuxContainer>
        <Modal show={this.state.puchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <div>{burger}</div>
      </AuxContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
