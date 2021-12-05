import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}
	
	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	}

	render () {
		return (
			<Aux>
				<Toolbar
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer 
					isAuth={this.props.isAuthenticated}
					opened={this.state.showSideDrawer} 
					closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					<div className={classes.PageContainer}>
						<div className={classes.ContentWrap}>
							{this.props.children}
						</div>
						<footer className={classes.Footer}>
							<a className={classes.TrevMorin} href='http://trevmorin.ca/'>TM</a>
							<a className={classes.French} href='http://sliderpiler.com/'>English</a>
							<br/>
							<span className={classes.Copyright}>&copy;<small> 2021 Superklok Labs</small></span>
						</footer>
					</div>
				</main>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
}

export default connect(mapStateToProps)(Layout);