import {db} from '../config/firebaseConfig';

export const useProduct = () => {
	const createProduct = data => {
		return db.collection('products').add(data)
			.then(doc => ({id: doc.id, ...data}))
			.catch(error => ({error}))
	}

	const updateProduct = ({id, ...data}) => {
		return db.collection('products').doc(id).update(data).catch(error => ({error}))
	}

	const deleteProduct = id => {
		return db.collection('products').doc(id).delete()
			.catch(error => ({error}))
	}

	return {createProduct, updateProduct, deleteProduct}
}
