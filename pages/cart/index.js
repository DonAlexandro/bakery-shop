import {useEffect, useState} from 'react'
import classes from '../../styles/MainLayout/cart.module.scss'
import MainLayout from '../../components/MainLayout/MainLayout';
import Page, {Sticker} from '../../components/MainLayout/Page';
import CartLayout, {
	CartEmpty,
	CartHeader,
	CartList,
	CartListItem,
	CartSum
} from '../../components/MainLayout/CartLayout';
import {wrapper} from '../../redux/store';
import {db} from '../../config/firebaseConfig';
import {setProducts} from '../../redux/actions';
import {useCart} from '../../hooks/useCart';
import {useAuth} from '../../hooks/useAuth';
import {useSelector} from 'react-redux';

export default function Cart() {
	const [cart, setCart] = useState([])
	const [clickedToDelete, setClickedToDelete] = useState(false)
	const [cartSum, setCartSum] = useState(0)

	const {user} = useAuth()
	const {fetchCart, addToCart} = useCart()
	const {products} = useSelector(state => state.products)

	useEffect(() => {
		function loadCart() {
			if (user?.id) {
				fetchCart(user.id).then(response => {
					if (response.products) {
						setCart(response.products || [])
					}
				})
			}
		}

		loadCart()
	}, [user])

	useEffect(() => {
		if (clickedToDelete) {
			addToCart({user: user.id, products: cart}).then(response => {
				if (response.products) {
					setCart(response.products)
					setClickedToDelete(false)
				}
			})
		}
	}, [clickedToDelete, user])

	const setProductSum = sum => setCartSum(prev => prev + +sum)

	const removeProductFromCart = id => {
		setCart(prev => prev.filter(product => product.productId !== id))
		setClickedToDelete(true)
	}

	const updateProductCount = (count, id) => {
		const editingProduct = cart.filter(product => product.productId === id)[0]
		editingProduct.count = count
	}

	return (
		<MainLayout
			title={'Корзина'}
			keywords={['корзина', 'cart']}
			description={'Корзина користувача'}
		>
			<Page>
				<Sticker>Корзина</Sticker>
				<CartLayout>
					<CartHeader count={cart.length}>Ваша корзина</CartHeader>
					{cart.length !== 0 ? <CartList>
						{cart.map((product, i) => {
							const parsedProduct = product

							return <CartListItem
								key={i}
								count={parsedProduct.count}
								product={products.filter(good => good.id === parsedProduct.productId)}
								setProductSum={setProductSum}
								removeProductFromCart={removeProductFromCart}
								updateProductCount={updateProductCount}
							/>
						})}
					</CartList> : <CartEmpty />}
					<CartSum sum={cartSum}/>
					<button className={`${classes.btnBlock} ${classes.btnPrimary}`}>Оформити замовлення</button>
				</CartLayout>
			</Page>
		</MainLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
	let products = []

	await db.collection('products').get().then(snapshot => {
		snapshot.forEach(product => products.push({id: product.id, ...product.data()}))
	})

	store.dispatch(setProducts(products))

	return {props: {}}
})
