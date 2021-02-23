import React from 'react';

import Slider from '../../Slider/Slider';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>Savourez votre slider!</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Slider ingredients={props.ingredients} />
			</div>
			<Button 
				btnType="Danger"
				clicked={props.checkoutCancelled}>Annuler</Button>
			<Button 
				btnType="Success"
				clicked={props.checkoutContinued}>Continuer</Button>
		</div>
	);
}

export default checkoutSummary;