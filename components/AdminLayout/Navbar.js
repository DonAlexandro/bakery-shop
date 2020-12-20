import Image from 'next/image';
import {useRouter} from 'next/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import classes from '../../styles/AdminLayout/components/navbar.module.scss'

export default function Navbar() {
	const router = useRouter()

	const links = [
		{text: 'Приборна панель', href: '/admin', icon: 'th-large'},
		{text: 'Замовлення', href: '/admin/orders', icon: 'shopping-bag'},
		{text: 'Товари', href: '/admin/goods', icon: 'boxes'},
		{text: 'Категорії', href: '/admin/categories', icon: 'list'},
		{text: 'Користувачі', href: '/admin/users', icon: 'users'},
		{text: `Зворотній зв'язок`, href: '/admin/supports', icon: 'comment-dots'},
		{text: `Налаштування`, href: '/admin/settings', icon: 'cogs'},
	]

	return (
		<nav className={`${classes.navbar} ${classes.shadowSm}`}>
			<div className={classes.navbarBrand}>
				<Link href={'/admin'}>
					<a className={[classes.tdNone]}>
						<Image
							src="/admin_logo.ico"
							alert="Logo"
							width={30}
							height={30}
						/>
						<span className={[
							classes.textDark,
							classes.fwBold,
							classes.ml2
						].join(' ')}>Міська</span><span className={classes.textSoft}>Пекарня</span>
					</a>
				</Link>
			</div>
			<ul className={`${classes.navbarElements}`}>
				{links.map((link,index) =>
					<li className={classes.neItem} key={index}>
						<Link href={link.href}>
							<a
								className={[
									classes.fwMedium,
									classes.tdNone,
									classes.neLink,
									router.pathname === link.href ? classes.neLinkActive : ''].join(' ')}
							>
								<span className={`${classes.neLinkIcon} ${classes.textSoft}`}><FontAwesomeIcon icon={link.icon} /></span>
								<span className={`${classes.neLinkText} ${classes.textBase}`}>{link.text}</span>
							</a>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}
