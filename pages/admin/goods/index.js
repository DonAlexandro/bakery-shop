import React, {useContext, useEffect, useState} from 'react';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import classes from '../../../styles/AdminLayout/goods.module.scss'
import PageHeader, {Title, Tools} from '../../../components/AdminLayout/PageHeader';
import TableList, {ListBody} from '../../../components/AdminLayout/TableList/index';
import RightSidebar from '../../../components/AdminLayout/RightSidebar';
import ProductForm from '../../../components/AdminLayout/forms/ProductForm';
import Button from '../../../components/AdminLayout/Button';
import {wrapper} from '../../../redux/store';
import {db} from '../../../config/firebaseConfig';
import {removeProduct, searchProduct, setCategories, setProducts} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../../../components/AdminLayout/TableList/ProductItem';
import {useProduct} from '../../../hooks/useProduct';
import {alertContext} from '../../../context/alert/alertContext';
import {useImage} from '../../../hooks/useImage';
import Modal from '../../../components/AdminLayout/Modal';
import ProductImage from '../../../components/AdminLayout/modals/ProductImage';
import {useForm} from 'react-hook-form';
import Input from '../../../components/AdminLayout/forms/components/Input';

export default function Goods() {
	const pageName = 'Товари'

	// Локальні стейти
	const [sidebar, setSidebar] = useState(false)
	const [modal, setModal] = useState(false)
	const [pickedProduct, setPickedProduct] = useState(null)
	const [fetchedProducts, setFetchedProducts] = useState([])

	// Хуки
	const dispatch = useDispatch()
	const {products, foundProducts} = useSelector(state => state.products)
	const {categories} = useSelector(state => state.categories)
	const {deleteProduct} = useProduct()
	const {deleteImage} = useImage()
	const {showAlert} = useContext(alertContext)
	const {register, handleSubmit} = useForm()

	useEffect(() => {
		if (foundProducts && foundProducts.length !== 0) {
			setFetchedProducts(foundProducts)
		} else {
			setFetchedProducts(products)
		}
	}, [products, foundProducts])

	// Функції
	const toggleSidebar = value => setSidebar(value)
	const toggleModal = value => setModal(value)

	const activateProduct = (product = null, image = false) => {
		setPickedProduct(product)
		image ? toggleModal(true) : toggleSidebar(true)
	}

	const onSearch = data => dispatch(searchProduct(data.id))

	const removeProd = product => {
		if (confirm('Після видалення товару відновити його буде не можливо. Продовжити?')) {
			return deleteImage(product.imagePath).then(response => {
				if (response?.error) {
					showAlert('Під час видалення товару виникла проблема', 'error')
					console.error(response.error.message)
				} else {
					deleteProduct(product.id).then(response => {
						if (response?.error) {
							showAlert('Під час видалення товару виникла проблема', 'error')
							console.error(response.error.message)
						} else {
							showAlert('Товар успішно видалено!', 'success')
							dispatch(removeProduct(product.id))
						}
					})
				}
			})
		}
	}

	const listHeader = [
		'#',
		'Назва товару',
		'Код товару',
		'Ціна товару',
		'Кількість на складі',
		'Категорія',
		'',
	]

	return (
		<AdminLayout title={pageName}>
			<PageHeader>
				<Title>Товари</Title>
				<Tools>
					<li>
						<form onSubmit={handleSubmit(onSearch)}>
							<Input
								type="text"
								placeholder="Пошук товару за кодом"
								name="id"
								icon="search"
								onRef={register}
							/>
						</form>
					</li>
					<li>
						<Button
							icon="plus"
							actions={{onClick: () => activateProduct()}}
						>Додати товар</Button>
					</li>
				</Tools>
			</PageHeader>
			<TableList listHeader={listHeader}>
				<ListBody>
					{fetchedProducts.map((product, index) =>
						<ProductItem
							key={product.id}
							product={product}
							index={index}
							categories={categories}
							actions={{
								image: () => activateProduct(product, true),
								edit: () => activateProduct(product),
								delete: () => removeProd(product)
							}}
						></ProductItem>
					)}
				</ListBody>
			</TableList>
			<RightSidebar options={{active: sidebar, toggleSidebar}}>
				<ProductForm
					toggleSidebar={toggleSidebar}
					product={pickedProduct}
				></ProductForm>
			</RightSidebar>
			{modal && <Modal toggleModal={toggleModal} title={pickedProduct.name}>
				<ProductImage product={pickedProduct} toggleModal={toggleModal}/>
			</Modal>}
		</AdminLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
	let categories = []
	let products = []

	await db.collection('categories').get().then(snapshot => {
		snapshot.forEach(cat => categories.push({id: cat.id, ...cat.data()}))
	})

	await db.collection('products').orderBy('name', 'asc').get().then(snapshot => {
		snapshot.forEach(product => products.push({id: product.id, ...product.data()}))
	})

	store.dispatch(setCategories(categories))
	store.dispatch(setProducts(products))

	return {props: {}}
})
