import classes from '../styles/MainLayout/errors.module.scss'
import Link from 'next/link';

export default function Error() {
	return (
		<div className={classes.error}>
			<h1>404</h1>
			<h5>Ой! Чому ви тут?</h5>
			<p>Схоже ви намагаєтеся зайти на сторінку, яку видалено, або її ніколи не існувало</p>
			<Link href={'/'}><a className={[classes.btn, classes.btnPrimary].join(' ')}>Повернутися на головну</a></Link>
		</div>
	)
}