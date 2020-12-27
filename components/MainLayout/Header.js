import Link from 'next/link';
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from '../../styles/MainLayout/components/header.module.scss'
import Image from 'next/image';
import {useAuth} from '../../hooks/useAuth';
import {db} from '../../config/firebaseConfig';
import {useEffect, useState} from 'react';

export default function Header() {
	const router = useRouter()
	const {user, signOut} = useAuth()

	const links = [
		{href: '/', text: 'Головна'},
		{href: '/about', text: 'Про нас'},
		{href: '/menu', text: 'Меню'},
		{href: '/cart', text: 'Корзина'},
		{href: '/contacts', text: 'Контакти'},
	]

	const [settings, setSettings] = useState({})

	useEffect(() => {
		async function load() {
			await db.collection('settings').doc(process.env.SETTINGS_ID).get().then(doc => {
				setSettings(doc.data())
			})
		}

		load()
	}, [])

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<h1>{settings.siteName}</h1>
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
				{user
					? <div className={classes.dropdown}>
						<Link href={'/auth/profile'}><a>
							<Image
								src={user.photoURL || '/thumb-user.jpg'}
								alt={user.email}
								width={30}
								height={30}
							></Image>
						</a></Link>
						<div className={`${classes.dropdownBody}`}>
							<a onClick={() => signOut()}>Вийти</a>
						</div>
					  </div>
					: <Link href={'/auth/login'}><a><FontAwesomeIcon icon="user"/></a></Link>}
			</nav>
		</header>
	)
}
