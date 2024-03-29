import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactInfo.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactInfo extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Nom'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Adresse de livraison'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Code postal'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
					maxLength: 6
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Pays'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Courriel'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'today', displayValue: 'Livré en 45min'},
						{value: 'priority', displayValue: 'Priorité (Jour suivant)'},
						{value: 'xpresspost', displayValue: 'Xpresspost (1-2 jours)'},
						{value: 'standard', displayValue: 'Standard (5-7 jours)'}
					]
				},
				value: 'today',
				validation: {},
				valid: true
			}
		},
		formIsValid: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		const formData = {};

		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		}

		this.props.onOrderSlider(order, this.props.token);
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
			touched: true
		});
		const updatedOrderForm = updateObject(this.state.orderForm, {
			[inputIdentifier]: updatedFormElement
		});
		let formIsValid = true;

		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
	}

	render () {
		const formElementsArray = [];

		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input 
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)} />
				))}
				<Button btnType='Success' disabled={!this.state.formIsValid}>Commandez</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactInfo}>
				<h4>Veuillez entrer vos informations de contact</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.sliderCompiler.ingredients,
		price: state.sliderCompiler.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderSlider: (orderData, token) => dispatch(actions.purchaseSlider(orderData, token))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInfo, axios));