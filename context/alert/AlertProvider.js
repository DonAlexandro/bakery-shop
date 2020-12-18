import React, {useReducer} from 'react'
import {alertContext} from './alertContext'
import {alertReducer} from './alertReducer';
import {HIDE_ALERT, SHOW_ALERT} from '../types';

export const AlertProvider = ({children}) => {
	const initialState = {alert: null}
	const [state, dispatch] = useReducer(alertReducer, initialState)

	const showAlert = (text, type, toast = false) => dispatch({type: SHOW_ALERT, payload: {text, type, toast}})
	const hideAlert = () => dispatch({type: HIDE_ALERT})

	return (
		<alertContext.Provider value={{
			showAlert, hideAlert,
			alert: state.alert
		}}>
			{children}
		</alertContext.Provider>
	)
}