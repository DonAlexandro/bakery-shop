import {db} from '../config/firebaseConfig'

export const useOrder = () => {
	const createOrder = order => {
		return db.collection('orders').add(order)
			.catch(error => ({error}))
	}

	const updateOrder = ({id, ...order}) => {
		return db.collection('orders').doc(id).update(order)
			.catch(error => ({error}))
	}

	const deleteOrder = id => {
		return db.collection('orders').doc(id).delete(id)
			.catch(error => ({error}))
	}

	return {createOrder, updateOrder, deleteOrder}
}