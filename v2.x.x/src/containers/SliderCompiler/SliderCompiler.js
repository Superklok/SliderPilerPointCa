import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Slider from '../../components/Slider/Slider';
import CompilerControls from '../../components/Slider/CompilerControls/CompilerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Slider/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class SliderCompiler extends Component {
	state = {
		purchasing: false
	}

	componentDidMount () {
		this.props.onInitIngredients();
	}

	updatePurchaseState (ingredients) {
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
		if (this.props.isAuthenticated) {
				this.setState({purchasing: true});
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	}

	render () {
		const disabledInfo = {
			...this.props.ings
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let slider = this.props.error ? <p>Impossible de charger les ingr&eacute;dients!</p> : <Spinner />;

		if (this.props.ings) {
			slider = (
				<Aux>
					<Slider ingredients={this.props.ings} />
					<CompilerControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
						price={this.props.price} />
				</Aux>
			);
			orderSummary = <OrderSummary
				ingredients={this.props.ings}
				price={this.props.price}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler} />;
		}
		
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
					{slider}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.sliderCompiler.ingredients,
		price: state.sliderCompiler.totalPrice,
		error: state.sliderCompiler.error,
		isAuthenticated: state.auth.token !== null
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SliderCompiler, axios));