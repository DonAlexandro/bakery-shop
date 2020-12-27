import {db} from '../config/firebaseConfig'

export const useSettings = () => {
	const updateSettings = data => {
		return db.collection('settings').doc(process.env.SETTINGS_ID).update(data)
			.catch(error => ({error}))
	}

	return {updateSettings}
}
