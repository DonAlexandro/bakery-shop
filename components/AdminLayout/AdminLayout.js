import Head from 'next/head';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faBars, faThLarge, faShoppingBag, faBoxes, faUsers,
	faCommentDots, faCogs, faCog, faSearch, faUser,
	faAngleDown, faAngleUp, faSignOutAlt, faPlus, faList,
	faEllipsisH, faTools, faEye, faEdit, faTrashAlt,
	faImage, faTruck, faArrowLeft, faClipboardList
} from '@fortawesome/free-solid-svg-icons'
import Navbar from './Navbar';
import classes from '../../styles/AdminLayout/components/adminLayout.module.scss'
import Header from './Header';
import {useRequireAuth} from '../../hooks/useRequireAuth';

library.add(
	faBars, faThLarge, faShoppingBag, faBoxes, faUsers,
	faCommentDots, faCogs, faCog, faSearch, faUser,
	faAngleDown, faAngleUp, faSignOutAlt, faPlus, faList,
	faEllipsisH, faTools, faEye, faEdit, faTrashAlt,
	faImage, faTruck, faArrowLeft, faClipboardList
)

export default function AdminLayout({children, title = 'Сторінка'}) {
	const {user} = useRequireAuth()
	if (!user || !user.isAdmin) return null

	return (
		<>
			<Head>
				<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
				<link rel="icon" href="/admin_logo.ico" />
				<title>{title} | Адмін Панель</title>
			</Head>
			<div className={classes.wrapper}>
				<Navbar></Navbar>
				<main>
					<Header />
					<div className={classes.containerFluid}>
						{children}
					</div>
				</main>
			</div>
		</>
	)
}
