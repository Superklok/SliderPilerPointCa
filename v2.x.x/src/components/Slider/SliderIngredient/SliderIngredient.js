import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './SliderIngredient.css';

class SliderIngredient extends Component {
	render () {
		let ingredient = null;
	
		switch ( this.props.type ) {
			case ( 'pain-fond' ):
				ingredient = <div className={classes.PainFond}></div>;
				break;
			case ( 'pain-haut' ):
				ingredient = (
					<div className={classes.PainHaut}>
						<div className={classes.Graines1}></div>
						<div className={classes.Graines2}></div>
					</div>
				);
				break;
			case ( 'viande' ):
				ingredient = <div className={classes.Viande}></div>;
				break;
			case ( 'fromage' ):
				ingredient = <div className={classes.Fromage}></div>;
				break;
			case ( 'laitue' ):
				ingredient = <div className={classes.Laitue}></div>;
				break;
			case ( 'bacon' ):
				ingredient = <div className={classes.Bacon}></div>;
				break;
			default:
				ingredient = null;
		}

		return ingredient;
	}
}

SliderIngredient.propTypes ={
	type: PropTypes.string.isRequired
};

export default SliderIngredient;