import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';
import * as actionTypes from '../../store/actions';

const Checkout = (props) => {
  const { onInitPurchase } = props;
  useEffect(() => {
    return () => onInitPurchase();
  }, [onInitPurchase]);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to='/' />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route path={`${props.match.path}/contact-data`} component={ContactData} />
      </div>
    );
    return summary;
  }
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
