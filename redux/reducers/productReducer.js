import {CREATE_PRODUCT, DELETE_PRODUCT, SEARCH_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT} from '../types';
import {HYDRATE} from 'next-redux-wrapper';

const initialState = {
	products: [],
	foundProducts: []
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return {...state, products: action.payload?.products?.products}
		case SET_PRODUCTS:
			return {...state, products: action.payload}
		case CREATE_PRODUCT:
			return {...state, products: state.products.concat([action.payload])}
		case UPDATE_PRODUCT:
			const newProducts = state.products.filter(product => product.id !== action.payload.id)
			newProducts.push(action.payload)

			return {...state, products: newProducts}

		case SEARCH_PRODUCT:
			return {
				...state,
				foundProducts: action.payload.trim() !== '' && state.products.filter(product => product.id.toLowerCase().includes(action.payload.toLowerCase())),
				products: state.products
			}
		case DELETE_PRODUCT:
			return {...state, products: state.products.filter(product => product.id !== action.payload)}
		default: return state
	}
}
