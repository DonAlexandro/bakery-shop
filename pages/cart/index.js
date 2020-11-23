import {useEffect, useState} from 'react'
import classes from '../../styles/cart.module.scss'
import MainLayout from '../../components/MainLayout';

export default function Cart() {
	const [goodsSum, setGoodsSum] = useState(0)

	const cart = [
		{count: 1, price: 10, title: 'Житньопшеничний хліб'},
		{count: 2, price: 12.5, title: 'Булка "сімейна"'},
		{count: 4, price: 15, title: 'Висівковий хліб'},
	]

	useEffect(() => {
		function countSum() {
			let sum = 0

			cart.forEach(good => sum += good.count * good.price)

			return sum
		}

		const sum = countSum()
		setGoodsSum(sum)
	}, [])

	return (
		<MainLayout title={'Cart'}>
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Корзина</h5>
				</div>
				<div className={classes.cart}>
					<header>
						<span>Ваше замовлення</span>
						<span>({cart.length} шт.)</span>
					</header>
					<ul className={classes.list}>
						{cart.map((product, i)  =>
							<li key={i}>
								<div className={classes.info}>
									<div className={classes.dFlex}>
										<button
											className={[classes.toggleBtnSm, classes.btnOutlinePrimary].join(' ')}
											onClick={() => product.count - 1}
										>-</button>
										<input
											type="number"
											className={`${classes.count} ${classes.formControl}`}
											value={product.count}
											onChange={e => product.count = e.target.value}
										/>
										<button
											className={[classes.toggleBtnSm, classes.btnOutlinePrimary].join(' ')}
											onClick={() => product.count + 1}
										>+</button>
									</div>
									<span className={classes.name}>{product.title}</span>
								</div>
								<div>{product.price} грн.</div>
							</li>
						)}
					</ul>
					<div className={classes.sum}>
						<span>Сума</span>
						<span>{goodsSum} грн.</span>
					</div>
					<button className={`${classes.btnBlock} ${classes.btnPrimary}`}>Оформити замовлення</button>
				</div>
			</div>
		</MainLayout>
	)
}
