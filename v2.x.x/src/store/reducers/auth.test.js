import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
	it('devrait rendre l\'état initial', () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	});

	it('devrait enregistrer le jeton lors de la connexion', () => {
		expect(reducer({
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		}, {
			type: actionTypes.AUTH_SUCCESS,
			idToken: 'test-token',
			userId: 'test-user-id'
		})).toEqual({
			token: 'test-token',
			userId: 'test-user-id',
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	});
});