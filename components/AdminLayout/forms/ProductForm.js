import {useForm} from 'react-hook-form';
import {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FormLayout from './FormLayout';
import {Col12, Col6, Row} from '../../Grid';
import Button from '../Button';
import {loadingContext} from '../../../context/loading/loadingContext';
import {addProduct, editProduct} from '../../../redux/actions';
import Select from './components/Select';
import File from './components/File';
import {useImage} from '../../../hooks/useImage';
import {alertContext} from '../../../context/alert/alertContext';
import Alert from '../../Alert';
import {useProduct} from '../../../hooks/useProduct';
import Image from 'next/image';
import Input, {FormGroup, HelperText, Label, Textarea} from './components/Input';

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
					{product && <Input
						type="hidden"
						name="id"
						value={product.id}
						onRef={register}
					/>}
					<Col12>
						<FormGroup>
							<Label inputName="name">Назва товару</Label>
							<Input
								id="name"
								type="text"
								name="name"
								value={product ? product.name : ''}
								onRef={register({
									required: 'Введіть, будь ласка, назву товару'
								})}
							/>
							{errors.name && <HelperText>{errors.name.message}</HelperText>}
						</FormGroup>
					</Col12>
					<Col12>
						<FormGroup>
							<Label inputName="description">Опис товару</Label>
							<Textarea
								name="description"
								id="description"
								value={product ? product.description : ''}
								onRef={register({
									required: 'Введіть, будь ласка, опис товару',
									minLength: {
										value: 15,
										message: 'Опис товару повинен містити мінімум 15 символів'
									}
								})}
							/>
							{errors.description && <HelperText>{errors.description.message}</HelperText>}
						</FormGroup>
					</Col12>
					<Col6>
						<FormGroup>
							<Label inputName="price">Ціна товару</Label>
							<Input
								id="price"
								type="number"
								name="price"
								value={product ? product.price : ''}
								onRef={register({
									required: 'Введіть, будь ласка, ціну товару',
									min: {
										value: 1,
										message: 'Товар не може коштувати менше одніє гривні'
									}
								})}
							/>
							{errors.price && <HelperText>{errors.price.message}</HelperText>}
						</FormGroup>
					</Col6>
					<Col6>
						<FormGroup>
							<Label inputName="amount">Початкова кількість</Label>
							<Input
								id="amount"
								type="number"
								name="amount"
								value={product ? product.amount : ''}
								onRef={register({
									required: 'Введіть, будь ласка, кількість товару',
									min: {
										value: 0,
										message: 'На складі не може бути менше 0 товарів'
									}
								})}
							/>
							{errors.amount && <HelperText>{errors.amount.message}</HelperText>}
						</FormGroup>
					</Col6>
					<Col12>
						<FormGroup>
							<Label inputName="category">Категорія</Label>
							<Select
								name="category"
								id="category"
								onRef={register({
									required: 'Виберіть, будь ласка, категорію'
								})}
							>
								{categories.map(cat =>
									<option key={cat.id} value={cat.id} selected={cat.id === product?.category}>{cat.name}</option>
								)}
							</Select>
							{errors.category && <HelperText>{errors.category.message}</HelperText>}
						</FormGroup>
					</Col12>
					{product && <Col12>
						<Label>Теперішнє зображення товару</Label>
						<Image
							src={product.imageFullPath}
							alt={product.name}
							width={500}
							height={300}
						/>
					</Col12>}
					{!product && <Col12>
						<FormGroup>
							<Label inputName="image">{product ? 'Нове зображення товару' : 'Зображення товару'}</Label>
							<File>
								<Input
									id="image"
									type="file"
									name="image"
									onRef={register({
										required: 'Завантажте, будь ласка, зображення'
									})}
									actions={{
										onClick: () => clearErrors(['image']),
										onChange: e => {
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
										}
									}}
								/>
							</File>
							{errors.image && <HelperText>{errors.image.message}</HelperText>}
						</FormGroup>
					</Col12>}
					<Col12>
						<Button
							loading={loading}
							icon={product ? 'edit' : 'plus'}
						>{product ? 'Оновити' : 'Додати'}</Button>
					</Col12>
				</Row>
			</form>
		</FormLayout>
	)
}
