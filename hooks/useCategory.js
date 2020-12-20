import {db} from '../config/firebaseConfig'

export const useCategory = () => {

	const createCategory = data => {
		return db.collection('categories').add(data)
			.then(doc => ({id: doc.id, ...data}))
			.catch(error => ({error}))
	}

	const updateCategory = ({id, ...data}) => {
		return db.collection('categories').doc(id).update(data).catch(error => ({error}))
	}

	const deleteCategory = id => {
		return db.collection('categories').doc(id).delete().catch(error => ({error}))
	}

	return {createCategory, updateCategory, deleteCategory}
}
