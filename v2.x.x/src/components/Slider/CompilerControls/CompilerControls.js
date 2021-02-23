import React from 'react';

import classes from './CompilerControls.css';
import CompilerControl from './CompilerControl/CompilerControl';

const controls = [
	{ label: 'Laitue', type: 'laitue' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Fromage', type: 'fromage' },
	{ label: 'Viande', type: 'viande' },
];

const compilerControls = ( props ) => (
	<div className={classes.CompilerControls}>
		<p>
			Prix ​​actuel: CA$
			<span className={classes.Price}> {props.price.toFixed(2)}</span>
		</p>
		{controls.map(ctrl => (
			<CompilerControl 
				key={ctrl.label} 
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]} />
		))}
		<button 
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}>{props.isAuth ? 'Commandez maintenant' : 'Connectez pour commander'}</button>
	</div>
);

export default compilerControls;