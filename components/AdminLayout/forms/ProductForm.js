import {useForm} from 'react-hook-form';
import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FormLayout from './FormLayout';
import classes from '../../../styles/AdminLayout/components/rsForm.module.scss';
import {Col12, Col6, Row} from '../../Grid';
import Button from '../Button';
import {loadingContext} from '../../../context/loading/loadingContext';
import {addProduct, editProduct, setCategories} from '../../../redux/actions';
import Select from './components/Select';
import File from './components/File';
import {useImage} from '../../../hooks/useImage';
import {alertContext} from '../../../context/alert/alertContext';
import Alert from '../../Alert';
import {useProduct} from '../../../hooks/useProduct';
import Image from 'next/image';

export default function ProductForm({toggleSidebar, product}) {
	const {loading, showLoading, hideLoading} = useContext(loadingContext)
	const {showAlert} = useContext(alertContext)

	const categories = useSelector(state => state.categories.categories)
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		errors,
		clearErrors,
		setError,
		setValue
	} = useForm()

	const {loadImage} = useImage()
	const {createProduct, updateProduct} = useProduct()

	const requestEnd = (message, type, form) => {
		showAlert(message, type)
		toggleSidebar(false)
		hideLoading()
		form.reset()
	}

	const onSubmit = async ({image, ...data}, e) => {
		showLoading()

		if (product) {
			const newProduct = {
				...data,
				imagePath: product.imagePath,
				imageFullPath: product.imageFullPath
			}

			return updateProduct(newProduct).then(response => {
				if(response?.error) {
					requestEnd(response.error.message, 'error', e.target)
				} else {
					requestEnd('Товар успішно оновлено', 'success', e.target)
					dispatch(editProduct(newProduct))
				}
			})
		} else {
			const folder = 'goods'
			const loadedImage = await loadImage(image[0], folder)

			if (loadedImage.error) {
				requestEnd(loadedImage.error.message, 'error', e.target)
				return
			}

			const newProduct = {
				...data,
				imagePath: `${folder}/${image[0].name}`,
				imageFullPath: loadedImage.url
			}

			return createProduct(newProduct).then(response => {
				if (response.error) {
					requestEnd(response.error.message, 'error', e.target)
				} else {
					requestEnd('Товар успішно додано!', 'success', e.target)
					dispatch(addProduct(response))
				}
			})
		}
	}

	const allowedImageExt = process.env.ALLOWED_IMAGE_EXTENSIONS

	return (
		<FormLayout
			title={product ? 'Редагувати товар' : 'Новий товар'}
			subtitle={`Впишіть інформацію і ${product ? 'відредагуйте цей товар' : 'додайте новий товар'}`}
		>
			<Alert />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					{product && <input
						type="hidden"
						name="id"
						defaultValue={product.id}
						ref={register}
					/>}
					<Col12>
						<div className={classes.formGroup}>
							<label className={classes.label} htmlFor="name">Назва товару</label>
							<input
								id="name"
								type="text"
								name="name"
								className={classes.formControl}
								defaultValue={product ? product.name : ''}
								ref={register({
									required: 'Введіть, будь ласка, назву товару'
								})}
							/>
							{errors.name && <span className={classes.invalidFeedback}>{errors.name.message}</span>}
						</div>
					</Col12>
					<Col12>
						<div className={classes.formGroup}>
							<label className={classes.label} htmlFor="description">Опис товару</label>
							<textarea
								name="description"
								id="description"
								className={classes.formControl}
								defaultValue={product ? product.description : ''}
								ref={register({
									required: 'Введіть, будь ласка, опис товару',
									minLength: {
										value: 15,
										message: 'Опис товару повинен містити мінімум 15 символів'
									}
								})}
							></textarea>
							{errors.description && <span className={classes.invalidFeedback}>{errors.description.message}</span>}
						</div>
					</Col12>
					<Col6>
						<div className={classes.formGroup}>
							<label className={classes.label} htmlFor="price">Ціна товару</label>
							<input
								id="price"
								type="number"
								name="price"
								defaultValue={product ? product.price : ''}
								className={classes.formControl}
								ref={register({
									required: 'Введіть, будь ласка, ціну товару',
									min: {
										value: 1,
										message: 'Товар не може коштувати менше одніє гривні'
									}
								})}
							/>
							{errors.price && <span className={classes.invalidFeedback}>{errors.price.message}</span>}
						</div>
					</Col6>
					<Col6>
						<div className={classes.formGroup}>
							<label className={classes.label} htmlFor="amount">Початкова кількість</label>
							<input
								id="amount"
								type="number"
								name="amount"
								defaultValue={product ? product.amount : ''}
								className={classes.formControl}
								ref={register({
									required: 'Введіть, будь ласка, кількість товару',
									min: {
										value: 0,
										message: 'На складі не може бути менше 0 товарів'
									}
								})}
							/>
							{errors.amount && <span className={classes.invalidFeedback}>{errors.amount.message}</span>}
						</div>
					</Col6>
					<Col12>
						<div className={classes.formGroup}>
							<label className={classes.label} htmlFor="category">Категорія</label>
							<Select
								name="category"
								id="category"
								styles={[classes.formControl]}
								onRef={register({
									required: 'Виберіть, будь ласка, категорію'
								})}
							>
								{categories.map(cat =>
									<option key={cat.id} value={cat.id} selected={cat.id === product?.category}>{cat.name}</option>
								)}
							</Select>
							{errors.category && <span className={classes.invalidFeedback}>{errors.category.message}</span>}
						</div>
					</Col12>
					{product && <Col12>
						<label className={classes.label}>Теперішнє зображення товару</label>
						<Image
							src={product.imageFullPath}
							alt={product.name}
							width={500}
							height={300}
						/>
					</Col12>}
					{!product && <Col12>
						<div className={classes.formGroup}>
							<label className={classes.label} htmlFor="image">{product ? 'Нове зображення товару' : 'Зображення товару'}</label>
							<File>
								<input
									id="image"
									type="file"
									name="image"
									ref={register({
										required: 'Завантажте, будь ласка, зображення'
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
					</Col12>}
					<Col12>
						<Button
							color="primary"
							loading={loading}
							icon={product ? 'edit' : 'plus'}
						>{product ? 'Оновити' : 'Додати'}</Button>
					</Col12>
				</Row>
			</form>
		</FormLayout>
	)
}
