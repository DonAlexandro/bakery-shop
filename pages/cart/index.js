import {useEffect, useState} from 'react'
import MainLayout from '../../components/MainLayout/MainLayout';
import Page, {Sticker} from '../../components/MainLayout/Page';
import CartLayout, {
	CartEmpty,
	CartHeader,
	CartList,
	CartListItem,
	CartSum
} from '../../components/MainLayout/CartLayout';
import {useCart} from '../../hooks/useCart';
import {useAuth} from '../../hooks/useAuth';
import Button from '../../components/MainLayout/Button';
import Modal from '../../components/MainLayout/Modal';
import OrderItem from '../../components/MainLayout/modals/OrderItem';

export default function Cart() {
	const [cart, setCart] = useState([])
	const [clickedToDelete, setClickedToDelete] = useState(false)
	const [cartSum, setCartSum] = useState(0)
	const [modal, setModal] = useState(false)

	const {user} = useAuth()
	const {fetchCart, addToCart} = useCart()

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
		setCart(prev => prev.filter(product => product.id !== id))
		setClickedToDelete(true)
	}

	const updateProductCount = (count, id) => {
		const editingProduct = cart.filter(product => product.id === id)[0]
		editingProduct.count = count
	}

	const toggleModal = value => setModal(value)
	const clearCart = () => setCart([])

	return (
		<MainLayout
			title={'Корзина'}
			keywords={['корзина', 'cart']}
			description={'Корзина користувача'}
		>
			<Page>
				<Sticker>Корзина</Sticker>
				<CartLayout>
					{cart.length !== 0 ? <>
						<CartHeader count={cart.length}>Ваша корзина</CartHeader>
							<CartList>
								{cart.map((product, i) =>
									<CartListItem
										key={i}
										count={product.count}
										product={product}
										setProductSum={setProductSum}
										removeProductFromCart={removeProductFromCart}
										updateProductCount={updateProductCount}
									/>
								)}
							</CartList>
							<CartSum sum={cartSum}/>
							<Button
								styles={{block: true}}
								actions={{
									onClick: () => toggleModal(true)
								}}
							>Оформити замовлення</Button>
						</> : <CartEmpty />}
				</CartLayout>
			</Page>
			{modal && <Modal toggleModal={toggleModal}>
				<OrderItem
					sum={cartSum}
					products={cart}
					customer={user}
					toggleModal={toggleModal}
					clearCart={clearCart}
				/>
			</Modal>}
		</MainLayout>
	)
}
