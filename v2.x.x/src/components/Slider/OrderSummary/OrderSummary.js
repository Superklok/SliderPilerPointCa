import React, {Component} from 'react';
import classes from './OrderSummary.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	render () {
		const ingredientSummary = Object.keys(this.props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
				</li>
			);
		});

		return (
			<Aux>
				<h3>Sommaire de votre commande</h3>
				<p>Un slider signature avec les ingr&eacute;dients suivants:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p>
					Prix total: CA$
					<span className={classes.Price}> {this.props.price.toFixed(2)}</span>
				</p>
				<p>Proc&eacute;der au paiement?</p>
				<Button btnType='Danger' clicked={this.props.purchaseCancelled}>Annuler</Button>
				<Button btnType='Success' clicked={this.props.purchaseContinued}>Continuer</Button>
			</Aux>
		);
	}
}

export default OrderSummary;