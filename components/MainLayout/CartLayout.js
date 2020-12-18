import classes from '../../styles/MainLayout/cart.module.scss';
import {useEffect, useState} from 'react';
import Image from 'next/image';

export default function CartLayout({children}) {
	return (
		<div className={classes.cart}>
			{children}
		</div>
	)
}

export function CartHeader({children, count}) {
	return (
		<header>
			<span>{children}</span>
			<span>({count} шт.)</span>
		</header>
	)
}

export function CartList({children}) {
	return (
		<ul className={classes.list}>
			{children}
		</ul>
	)
}

export function CartListItem({product, count, setProductSum, removeProductFromCart, updateProductCount}) {
	const [localCount, setLocalCount] = useState(+count || 1)

	const changeCount = value => {
		if (localCount > 0) {
			setLocalCount(prev => prev + +value)
			value > 0 ? setProductSum(product[0].price) : setProductSum(-product[0].price)
		}
	}

	const removeCurrentProduct = () => {
		removeProductFromCart(product[0].id)
		setProductSum(-(product[0].price * localCount))
	}

	useEffect(() => {
		setProductSum(product[0].price)
	}, [])

	useEffect(() => {
		updateProductCount(localCount, product[0].id)
	}, [localCount])

	return (
		<li>
			<div className={classes.info}>
				<div className={classes.dFlex}>
					<button
						className={[classes.toggleBtnSm, classes.btnOutlinePrimary].join(' ')}
						onClick={() => changeCount(-1)}
					>-</button>
					<input
						type="number"
						className={`${classes.count} ${classes.formControl}`}
						value={localCount}
						readOnly
					/>
					<button
						className={[classes.toggleBtnSm, classes.btnOutlinePrimary].join(' ')}
						onClick={() => changeCount(1)}
					>+</button>
				</div>
				<span className={classes.name}>{product[0].name}</span>
			</div>
			<div>{product[0].price * localCount} грн.</div>
			<div
				onClick={() => removeCurrentProduct()}
				className={classes.remove}
			>&times;</div>
		</li>
	)
}

export function CartSum({sum}) {
	return (
		<div className={classes.sum}>
			<span>Сума</span>
			<span>{sum} грн.</span>
		</div>
	)
}

export function CartEmpty() {
	return (
		<div className={classes.cartEmpty}>
			<Image
				src="/empty_cart.png"
				alt="Cart is empty"
				width={64}
				height={64}
			/>
			<p>Ваша корзина пуста. Подивіться меню і виберіть те, що вам подобається</p>
		</div>
	)
}
