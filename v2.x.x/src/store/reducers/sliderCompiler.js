import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	ingredients: null,
	totalPrice: 1,
	error: false,
	compiling: false
};

const INGREDIENT_PRICES = {
	laitue: 0.75,
	bacon: 1.5,
	fromage: 1.25,
	viande: 2
}

const addIngredient = (state, action) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		compiling: true
	}
	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	const resultingIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
	const resultingIngredients = updateObject(state.ingredients, resultingIngredient);
	const resultingState = {
		ingredients: resultingIngredients,
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
		compiling: true
	}
	return updateObject(state, resultingState);
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			laitue: action.ingredients.laitue,
			bacon: action.ingredients.bacon,
			fromage: action.ingredients.fromage,
			viande: action.ingredients.viande
		},
		totalPrice: 1,
		error: false,
		compiling: false
	});
};

const fetchIngredientsFailed = (state, action) => {
	return updateObject(state, { error: true} );
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
		default: return state;
	}
};

export default reducer;