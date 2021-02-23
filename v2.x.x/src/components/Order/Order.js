import React from 'react';

import classes from './Order.css';

const order = (props) => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push(
			{
				name: ingredientName, 
				amount: props.ingredients[ingredientName]
			}
		)
	}

	const ingredientOutput = ingredients.map(ig => {
		return <span 
			style={{
				textTransform: 'capitalize',
				display: 'inline-block',
				margin: '9px',
				padding: '5px',
				backgroundColor: '#3A3A42',
				boxShadow: 'inset 0 0 10px #565661, 0 0 10px #3A3A42'
			}}
			key={ig.name}>{ig.name} ({ig.amount})</span>;
	});

	return (
		<div className={classes.Order}>
			<p>Ingr&eacute;dients: {ingredientOutput}</p>
			<p>Prix: CA$ {Number.parseFloat(props.price).toFixed(2)}</p>
		</div>
	);
};

export default order;