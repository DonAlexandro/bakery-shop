import {db} from '../config/firebaseConfig'

export const useCart = () => {
	const addToCart = ({user, products}) => {
		return db.collection('cart').doc(user).set({products})
			.then(() => ({user, products}))
			.catch(error => ({error}))
	}

	const fetchCart = id => {
		return db.collection('cart').doc(id).get()
			.then(doc => ({products: doc.data().products}))
			.catch(error => ({error}))
	}

	const deleteCart = id => {
		return db.collection('cart').doc(id).delete()
			.catch(error => ({error}))
	}

	return {addToCart, fetchCart, deleteCart}
}
