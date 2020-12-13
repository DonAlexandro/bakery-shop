import {
	CREATE_CATEGORY,
	CREATE_PRODUCT,
	DELETE_CATEGORY, DELETE_PRODUCT,
	SEARCH_CATEGORY,
	SET_CATEGORIES, SET_PRODUCTS,
	UPDATE_CATEGORY, UPDATE_PRODUCT
} from './types';

export function addCategory(category) {
	return {
		type: CREATE_CATEGORY,
		payload: category
	}
}

export function editCategory(category) {
	return {
		type: UPDATE_CATEGORY,
		payload: category
	}
}

export function setCategories(categories) {
	return {
		type: SET_CATEGORIES,
		payload: categories
	}
}

export function removeCategory(id) {
	return {
		type: DELETE_CATEGORY,
		payload: id
	}
}

export function searchCategory(name) {
	return {
		type: SEARCH_CATEGORY,
		payload: name
	}
}

export function addProduct(product) {
	return {
		type: CREATE_PRODUCT,
		payload: product
	}
}

export function editProduct(product) {
	return {
		type: UPDATE_PRODUCT,
		payload: product
	}
}

export function removeProduct(id) {
	return {
		type: DELETE_PRODUCT,
		payload: id
	}
}

export function setProducts(products) {
	return {
		type: SET_PRODUCTS,
		payload: products
	}
}
