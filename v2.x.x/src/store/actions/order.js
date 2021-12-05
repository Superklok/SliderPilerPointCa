import * as actionTypes from './actionTypes';

export const purchaseSliderSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_SLIDER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
}

export const purchaseSliderFail = (error) => {
	return {
		type: actionTypes.PURCHASE_SLIDER_FAIL,
		error: error
	};
}

export const purchaseSliderStart = () => {
	return {
		type: actionTypes.PURCHASE_SLIDER_START
	};
}

export const purchaseSlider = (orderData, token) => {
	return {
		type: actionTypes.PURCHASE_SLIDER,
		orderData: orderData,
		token: token
	};
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
}

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
}

export const fetchOrders = (token, userId) => {
	return {
		type: actionTypes.FETCH_ORDERS,
		token: token,
		userId: userId
	};
}