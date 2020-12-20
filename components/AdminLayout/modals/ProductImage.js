import {ModalContent, ModalFooter} from '../Modal';
import File from '../forms/components/File';
import {useForm} from 'react-hook-form';
import classes from '../../../styles/AdminLayout/components/forms.module.scss'
import spaces from '../../../styles/utils/spaces.module.scss'
import Button from '../Button';
import Image from 'next/image';
import {loadingContext} from '../../../context/loading/loadingContext';
import {useContext} from 'react';
import {alertContext} from '../../../context/alert/alertContext';
import {useImage} from '../../../hooks/useImage';
import {useProduct} from '../../../hooks/useProduct';
import {useDispatch} from 'react-redux';
import {editProduct} from '../../../redux/actions';

export default function ProductImage({product, toggleModal}) {
	const {
		register,
		handleSubmit,
		errors,
		clearErrors,
		setError,
		setValue
	} = useForm()

	const allowedImageExt = process.env.ALLOWED_IMAGE_EXTENSIONS

	const dispatch = useDispatch()
	const {loading, showLoading, hideLoading} = useContext(loadingContext)
	const {showAlert} = useContext(alertContext)
	const {loadImage} = useImage()
	const {updateProduct} = useProduct()

	const requestEnd = (message, type) => {
		toggleModal(false)
		showAlert(message, type)
		hideLoading()
	}

	const onSubmit = async ({image}) => {
		showLoading()

		const folder = 'goods'

		const loadedImage = await loadImage(image[0], folder)

		if (loadedImage.error) {
			requestEnd(loadedImage.error.message, 'error')
			return
		}

		const newProduct = {
			...product,
			imagePath: `${folder}/${image[0].name}`,
			imageFullPath: loadedImage.url
		}

		updateProduct(newProduct).then(response => {
			if (response?.error) {
				requestEnd(response.error.message, 'error')
			} else {
				requestEnd('Зображення успішно оновлено!', 'success')
				dispatch(editProduct(newProduct))
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<ModalContent>
				<div className={spaces.mb3}>
					<label className={classes.label}>Теперішнє зображення</label>
					<Image
						src={product.imageFullPath}
						alt={product.name}
						width={500}
						height={300}
					/>
				</div>
				<div className={classes.formGroup}>
					<label className={classes.label} htmlFor="image">Нове зображення</label>
					<File>
						<input
							id="image"
							type="file"
							name="image"
							ref={register({
								required: 'Виберіть, будь ласка, зображення'
							})}
							onClick={() => clearErrors(['image'])}
							onChange={e => {
								if (!allowedImageExt.includes(e.target.files[0]?.type)) {
									setError('image', {
										type: 'manual',
										message: 'Невірний формат. Дозволено загружати лише файли з розширенням png, jpg i webp'
									})
									setValue('image', null)
								} else if (e.target.files[0]?.size >= 5000000) {
									setError('image', {
										type: 'manual',
										message: 'Файл повинен бути не більшим 5мб'
									})
									setValue('image', null)
								}
							}}
						/>
					</File>
					{errors.image && <span className={classes.invalidFeedback}>{errors.image.message}</span>}
				</div>
			</ModalContent>
			<ModalFooter>
				<Button
					icon={'edit'}
					color="primary"
					loading={loading}
				>Оновити</Button>
			</ModalFooter>
		</form>
	)
}
