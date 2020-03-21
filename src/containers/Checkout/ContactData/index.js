import React from 'react';

import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import axios from '../../../axios-orders';

import classes from './styles.css';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Van Dang',
        address: {
          street: 'Ho Chi Minh',
          zipCode: '700000',
          country: 'Viet Nam',
        },
        email: 'test@test@gmail.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input className={classes.Input} type='text' name='name' placeholder='Your name' />
        <input className={classes.Input} type='text' name='eamil' placeholder='Your email' />
        <input className={classes.Input} type='text' name='street' placeholder='Street' />
        <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
        <Button btnType='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
