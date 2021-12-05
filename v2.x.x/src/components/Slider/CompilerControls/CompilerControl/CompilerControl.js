import React from 'react';
import classes from './CompilerControl.css';

const compilerControl = (props) => (
	<div className={classes.CompilerControl}>
		<div className={classes.Label}>{props.label}</div>
		<button 
			className={classes.Less} 
			onClick={props.removed} 
			disabled={props.disabled}>Moins</button>
		<button 
			className={classes.More} 
			onClick={props.added}>Plus</button>
	</div>
);

export default compilerControl;