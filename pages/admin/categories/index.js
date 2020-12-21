import React, {useContext, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AdminLayout from '../../../components/AdminLayout/AdminLayout'
import classes from '../../../styles/AdminLayout/categories.module.scss'
import CategoryForm from '../../../components/AdminLayout/forms/CategoryForm';
import {db} from '../../../config/firebaseConfig';
import TableList, {ListBody} from '../../../components/AdminLayout/TableList/index';
import PageHeader, {Title, Tools} from '../../../components/AdminLayout/PageHeader';
import {useCategory} from '../../../hooks/useCategory';
import {alertContext} from '../../../context/alert/alertContext';
import {wrapper} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setCategories, removeCategory, searchCategory, setProducts, editProduct} from '../../../redux/actions';
import {useForm} from 'react-hook-form';
import Alert from '../../../components/Alert';
import Button from '../../../components/AdminLayout/Button';
import CategoryItem from '../../../components/AdminLayout/TableList/CategoryItem';
import RightSidebar from '../../../components/AdminLayout/RightSidebar';
import {useProduct} from '../../../hooks/useProduct';

export default function Categories() {
	// Plain variables
	const pageName = 'Категорії'
	const notAllowedCategory = process.env.NOT_ALLOWED_CATEGORY

	// Локальний стейт
	const [sidebar, setSidebar] = useState(false)
	const [pickedCategory, setPickedCategory] = useState(null)
	const [fetchedCategories, setFetchedCategories] = useState([])

	// Хуки
	const dispatch = useDispatch()
	const {deleteCategory} = useCategory()
	const {updateProduct} = useProduct()
	const {showAlert} = useContext(alertContext)
	const {register, handleSubmit} = useForm()
	const {categories, foundCategories} = useSelector(state => state.categories)
	const {products} = useSelector(state => state.products)

	useEffect(() => {
		// Якщо користувач починає шукати
		if (foundCategories.length !== 0) {
			setFetchedCategories(foundCategories)
		} else {
			setFetchedCategories(categories)
		}
	}, [categories, foundCategories])


	// Функції
	const removeCat = id => {
		if (id !== notAllowedCategory) {
			if (confirm('Відновити цю категорію буде не можливо. Продовжити?')) {
				const productsInCategory = products.filter(product => product.category === id)

				return deleteCategory(id).then(response => {
					if (response?.error) {
						showAlert(response.error.message, 'error')
					} else {
						showAlert('Категорію було видалено', 'warning')

						productsInCategory.forEach(product => {
							const newProduct = {
								...product,
								category: notAllowedCategory
							}

							updateProduct(newProduct).then(response => console.log(response?.error))
							dispatch(editProduct(newProduct))
						})

						dispatch(removeCategory(id))
					}
				})
			}
		} else {
			showAlert('Цю категорію видалити не можливо', 'error')
		}
	}

	const toggleSidebar = value => setSidebar(value)
	const onSearch = data => dispatch(searchCategory(data.search))

	const activateCategory = (category = null) => {
		if (category?.id === notAllowedCategory) {
			showAlert('Ви не можете редагувати цю категорію', 'error')
		} else {
			setPickedCategory(category)
			toggleSidebar(true)
		}
	}

	const listHeader = [
		'#', 'Назва категорії', 'Кількість товарів в категорії', '',
	]

	return (
		<AdminLayout title={pageName}>
			<Alert />
			<PageHeader>
				<Title>Категорії</Title>
				<Tools>
					<li>
						<form className={classes.formControlWrap} onSubmit={handleSubmit(onSearch)}>
							<div className={`${classes.formIcon} ${classes.formIconRight}`}>
								<FontAwesomeIcon icon="search" />
							</div>
							<input
								type="text"
								placeholder="Пошук категорій"
								name="search"
								className={classes.formControl}
								ref={register}
							/>
						</form>
					</li>
					<li>
						<Button
							icon="plus"
							color="primary"
							clickAct={() => activateCategory()}
						>Додати категорію</Button>
					</li>
				</Tools>
			</PageHeader>
			<TableList listHeader={listHeader}>
				<ListBody>
					{fetchedCategories.map((cat, index) =>
						<CategoryItem
							key={cat.id}
							index={index}
							category={cat}
							products={products}
							actions={{
								edit: () => activateCategory(cat),
								delete: () => removeCat(cat.id)
							}}
						></CategoryItem>
					)}
				</ListBody>
			</TableList>
			<RightSidebar options={{active: sidebar, toggleSidebar}}>
				<CategoryForm toggleSidebar={toggleSidebar} category={pickedCategory} />
			</RightSidebar>
		</AdminLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
	let categories = []
	let products = []

	await db.collection('categories').get().then(snapshot => {
		snapshot.forEach(cat => categories.push({id: cat.id, ...cat.data()}))
	})

	await db.collection('products').get().then(snapshot => {
		snapshot.forEach(product => products.push({id: product.id, ...product.data()}))
	})

	store.dispatch(setCategories(categories))
	store.dispatch(setProducts(products))

	return {props: {}}
})
