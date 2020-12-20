import classes from '../../styles/MainLayout/menu.module.scss';
import Button from './Button';

export default function MenuList({children, category}) {
	return (
		<div className={classes.menu}>
			<h5 className={classes.category}>{category}</h5>
			<ul className={classes.list}>
				{children}
			</ul>
		</div>
	)
}

export function Product({good, button}) {
	return (
		<li>
			<div className={classes.img}>
				<img src={good.imageFullPath} alt={good.title} />
			</div>
			<div className={classes.info}>
				<h6 className={classes.title}>
					<span>{good.name}</span>
					<span>{good.price} грн</span>
				</h6>
				<p>{good.description}</p>
				<Button
					loading={button.loading}
					actions={{
						onClick: () => button.action()
					}}
				>В корзину</Button>
			</div>
		</li>
	)
}
