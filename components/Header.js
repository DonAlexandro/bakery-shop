import Link from 'next/link';
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from '../styles/components/header.module.scss'

export default function Header() {
	const router = useRouter()

	const links = [
		{href: '/', text: 'Головна'},
		{href: '/about', text: 'Про нас'},
		{href: '/menu', text: 'Меню'},
		{href: '/cart', text: 'Корзина'},
		{href: '/contacts', text: 'Контакти'},
	]

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<h1>Міська пекарня</h1>
			</div>
			<nav className={classes.nav}>
				{links.map((link, index) =>
					<Link
						key={index}
						href={link.href}
					>
						<a className={router.pathname === link.href ? classes.active : ''}>{link.text}</a>
					</Link>
				)}
				<Link href={'/auth/login'}>
					<a><FontAwesomeIcon icon="user"/></a>
				</Link>
			</nav>
		</header>
	)
}
