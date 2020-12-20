import {HYDRATE} from 'next-redux-wrapper';
import {CREATE_CATEGORY, DELETE_CATEGORY, SEARCH_CATEGORY, SET_CATEGORIES, UPDATE_CATEGORY} from '../types'

const initialState = {
	categories: [],
	foundCategories: []
}

export const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return {...state, categories: action.payload?.categories?.categories}
		case SET_CATEGORIES:
			return {...state, categories: action.payload}
		case CREATE_CATEGORY:
			return {...state, categories: state.categories.concat([action.payload])}
		case UPDATE_CATEGORY:
			const newCategories = state.categories.filter(cat => cat.id !== action.payload.id)
			newCategories.push(action.payload)

			return {...state, categories: newCategories}
		case SEARCH_CATEGORY:
			return {
				...state,
				foundCategories: action.payload.trim() !== ''
					? state.categories.filter(cat => cat.name.toLowerCase().includes(action.payload.toLowerCase()))
					: state.categories
			}
		case DELETE_CATEGORY:
			return {...state, categories: state.categories.filter(cat => cat.id !== action.payload)}
		default: return state
	}
}
