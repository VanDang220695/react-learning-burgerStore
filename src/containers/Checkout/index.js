import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { List, Row, Col, Button, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import * as actionTypes from '../../store/actions';
import classes from './styles.module.css';

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
	bread: 4,
};

const Checkout = (props) => {
	const { onInitPurchase, address, ings, totalPrice } = props;
	useEffect(() => {
		return () => onInitPurchase();
	}, [onInitPurchase]);

	if (!props.ings) {
		props.history.push('/');
	}

	const ingsIngredientsShow = { ...ings, bread: 1 };

	const showIngredients = Object.keys(ingsIngredientsShow).map((igKey) => {
		return (
			<Row key={igKey}>
				<Col span={20}>
					<div className={classes.Capital}>{igKey}</div>
				</Col>
				<Col span={1}>
					<div>{ingsIngredientsShow[igKey]}</div>
				</Col>
				<Col span={1}>
					<div>x</div>
				</Col>
				<Col span={1}>
					<div className={classes.Money}>{INGREDIENT_PRICE[igKey]}</div>
				</Col>
				<Col span={1}>
					<div className={classes.Money}>$</div>
				</Col>
			</Row>
		);
	});

	const onOrderHandler = () => {
		if (!props.address) {
			return Modal.warning({
				title: 'Please update profile first',
				onOk: () => {
					props.history.push('/profile');
					return;
				},
			});
		}
		props.onOrderBurger({
			ingredients: ings,
			price: totalPrice,
			createAt: new Date().toISOString(),
		});
		props.onInitIngredient();
		props.history.push('/');
	};

	const onCancelHandler = () => {
		props.history.push('/');
	};

	return (
		<div className={classes.Checkout__Container}>
			<List
				header={
					<p className={classes.Order__title}>
						<ShoppingCartOutlined />
						<span style={{ marginLeft: '24px' }}>Your orders</span>
					</p>
				}
				bordered>
				<div style={{ margin: '20px 50px' }}>
					<p className={classes.Txt__Thank}>
						Thanks for your buying. I hope you taste well. See you again
					</p>
					{showIngredients}
					<hr />
					<Row>
						<Col span={22}>
							<div className={classes.Capital}>Total</div>
						</Col>
						<Col span={1}>
							<div className={classes.Money}>{totalPrice.toFixed(2)}</div>
						</Col>
						<Col span={1}>
							<div className={classes.Money}>$</div>
						</Col>
					</Row>
					<p className={classes.Txt__Delivery}>Delivery at {address}</p>
					<Row justify='end'>
						<Button onClick={onCancelHandler}>CANCEL</Button>
						<Button
							style={{ marginLeft: '16px' }}
							type='primary'
							onClick={onOrderHandler}>
							ORDER
						</Button>
					</Row>
				</div>
			</List>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		address: state.profile.profile.address,
	};
};

const mapDispatchToProps = (dispatch) => ({
	onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
	onOrderBurger: (payload) => dispatch(actionTypes.purchaseBurger(payload)),
	onInitIngredient: () => dispatch(actionTypes.initIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
