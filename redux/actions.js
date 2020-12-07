import {CREATE_CATEGORY, DELETE_CATEGORY, SEARCH_CATEGORY, SET_CATEGORIES, UPDATE_CATEGORY} from './types';

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
