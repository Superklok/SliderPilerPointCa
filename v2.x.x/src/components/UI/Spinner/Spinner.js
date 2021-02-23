import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
	<div className={classes.Space}>
		<div className={classes.Spinner}>Veuillez patienter...</div>
	</div>
);

export default spinner;