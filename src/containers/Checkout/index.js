import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import * as actionTypes from '../../store/actions';
import classes from './styles.module.css';

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const Checkout = (props) => {
  const { onInitPurchase, profile, ings } = props;
  useEffect(() => {
    return () => onInitPurchase();
  }, [onInitPurchase]);

  // if (!props.ings || props.purchased) {
  //   props.history.push('/');
  // }

  const showIngredients = Object.keys(ings || {}).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
        <span style={{ marginLeft: '50px', marginRight: '10px' }}>{ings[igKey]}</span>x
        <span style={{ marginLeft: '10px' }}>{INGREDIENT_PRICE[igKey]}</span>
      </li>
    );
  });

  return (
    <div className={classes.Checkout__Container}>
      <List
        header={
          <p className={classes.Order__title}>
            <ShoppingCartOutlined />
            <span style={{ marginLeft: '24px' }}>Your orders</span>
          </p>
        }
        bordered
      >
        <div style={{ margin: '20px' }}>
          <p style={{ fontSize: '18px' }}>Thanks for your buying. I hope you taste well</p>
          <ul>
            <li key='basic'>
              <span style={{ textTransform: 'capitalize' }}>Bread</span>
              <span style={{ marginLeft: '70px' }}>4$</span>
            </li>
            {showIngredients}
          </ul>
          <hr />
        </div>
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
    profile: state.profile.profile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
