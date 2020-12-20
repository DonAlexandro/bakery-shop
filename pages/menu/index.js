import MainLayout from '../../components/MainLayout/MainLayout';
import Page, {Sticker} from '../../components/MainLayout/Page';
import MenuList, {Product} from '../../components/MainLayout/Menu';
import {wrapper} from '../../redux/store';
import {db} from '../../config/firebaseConfig';
import {setCategories, setProducts} from '../../redux/actions';
import {useSelector} from 'react-redux';
import {useAuth} from '../../hooks/useAuth';
import {useCallback, useContext, useEffect, useState} from 'react';
import {loadingContext} from '../../context/loading/loadingContext';
import {alertContext} from '../../context/alert/alertContext';
import Alert from '../../components/Alert';
import {useCart} from '../../hooks/useCart';

export default function Menu() {
	const pageName = 'Меню'

	const {user} = useAuth()
	const {addToCart, fetchCart} = useCart()
	const {products} = useSelector(state => state.products)
	const {categories} = useSelector(state => state.categories)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)
	const {showAlert} = useContext(alertContext)

	const [cart, setCart] = useState({})
	const [productsInCart, setProductsInCart] = useState([])
	const [clickedToAdd, setClickedToAdd] = useState(false)

	useEffect(() => {
		function addCartToDB() {
			if (cart.user && cart.products.length !== 0 && clickedToAdd) {
				addToCart(cart).then(response => {
					if (response.error) {
						requestEnd('Щось пішло не так...', 'success')
						console.error(response.error)
					} else {
						requestEnd('Товар додано у козину', 'success', true)
					}
				})
			}
		}

		addCartToDB()
	}, [cart])

	useEffect(() => {
		setCart({
			user: user?.id,
			products: productsInCart
		})
	}, [productsInCart, user])

	useEffect(() => {
		async function loadCartFromDB() {
			if (user?.id) {
				await fetchCart(user.id).then(response => setProductsInCart(response.products || []))
			}
		}

		loadCartFromDB()
	}, [user])

	const requestEnd = (message, type, toast) => {
		showAlert(message, type, toast)
		hideLoading()
		setClickedToAdd(false)
	}

	const addToLocalCart = good => {
		const isProductInCart = productsInCart.some(product => product.id === good.id)

		if (isProductInCart) {
			requestEnd('Цей товар уже в вашій корзині :)', 'success', true)
		} else {
			const newProduct = {
				count: 1,
				id: good.id,
				name: good.name,
				price: good.price
			}

			setProductsInCart(prev => [
				...prev,
				newProduct
			])

			setClickedToAdd(true)
		}
	}

	return (
		<MainLayout
			title={pageName}
			keywords={['menu', 'меню']}
			description={''}
		>
			<Alert />
			<Page>
				<Sticker>{pageName}</Sticker>
				{categories.map(category =>
					<MenuList category={category.name} key={category.id}>
						{products.filter(product => product.category === category.id).map(product =>
							<Product
								good={product}
								key={product.id}
								button={{
									loading,
									action: () => addToLocalCart(product)
								}}
							></Product>
						)}
					</MenuList>
				)}
			</Page>
		</MainLayout>
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
