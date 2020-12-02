import {loadingContext} from './loadingContext'
import {useReducer} from 'react';
import {loadingReducer} from './loadingReducer';
import {HIDE_LOADER, SHOW_LOADER} from '../types';

export const LoadingProvider = ({children}) => {
	const initialState = {loading: false}
	const [state, dispatch] = useReducer(loadingReducer, initialState)

	const showLoading = () => dispatch({type: SHOW_LOADER})
	const hideLoading = () => dispatch({type: HIDE_LOADER})

	return (
		<loadingContext.Provider value={{
			hideLoading, showLoading,
			loading: state.loading
		}}>
			{children}
		</loadingContext.Provider>
	)
}