import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it('devrait rendre deux éléments <NavigationItem /> si non autorisé', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('devrait rendre trois éléments <NavigationItem /> si non autorisé', () => {
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('devrait exiger un bouton de déconnexion', () => {
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.contains(<NavigationItem link='/logout'>D&eacute;connexion</NavigationItem>)).toEqual(true);
	});
});