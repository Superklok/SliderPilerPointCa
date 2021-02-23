import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>emPiler</NavigationItem>
		{props.isAuthenticated ? <NavigationItem link="/orders">Commandes</NavigationItem> : null}
		{!props.isAuthenticated
			? <NavigationItem link="/auth">Connexion</NavigationItem>
			: <NavigationItem link="/logout">D&eacute;connexion</NavigationItem>}
	</ul>
);

export default navigationItems;