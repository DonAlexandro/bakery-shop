import {storage} from '../config/firebaseConfig';

export const useImage = () => {
	const loadImage = (file, folder) => {
		const uploadTask = storage.ref(`/${folder}/${file.name}`).put(file)

		return new Promise(resolve => {
			uploadTask.on(
				'state_changed',
				() => {},
				error => resolve(error),
				() => {
					uploadTask.snapshot.ref.getDownloadURL()
						.then(url => resolve({url}))
						.catch(error => resolve({error}))
				}
			)
		}).then(response => (response))
	}

	const deleteImage = path => {
		return storage.ref(path).delete().catch(error => ({error}))
	}

	return {loadImage, deleteImage}
}