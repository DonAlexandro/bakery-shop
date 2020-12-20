import {db} from '../config/firebaseConfig'

export const useOrder = () => {
	const createOrder = order => {
		return db.collection('orders').add(order)
			.catch(error => ({error}))
	}

	return {createOrder}
}