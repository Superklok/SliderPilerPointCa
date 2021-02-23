import React from 'react';

import classes from './Slider.css';
import SliderIngredient from './SliderIngredient/SliderIngredient';

const slider = ( props ) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) =>{
				return <SliderIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el)
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Empilez vos ingr&eacute;dients!</p>
	}
	return (
		<div className={classes.Slider}>
			<SliderIngredient type="pain-haut" />
			{transformedIngredients}
			<SliderIngredient type="pain-fond" />
		</div>
	);
};

export default slider;