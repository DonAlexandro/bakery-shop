import Head from 'next/head';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
	faUser,
	faHome,
	faCog,
	faUserTimes,
	faUserPlus,
	faTruck,
	faClipboardCheck,
	faClipboardList

} from '@fortawesome/free-solid-svg-icons'
import Header from './Header';
import Footer from './Footer';
import classes from '../../styles/MainLayout/components/mainLayout.module.scss'

library.add(
	fab,
	faUser,
	faHome,
	faCog,
	faUserTimes,
	faUserPlus,
	faTruck,
	faClipboardCheck,
	faClipboardList
)

export default function MainLayout({children, title = 'Сторінка', keywords = [], description}) {
	keywords = ['bakery', 'пекарня', 'місто', 'town', ...keywords]
	description = description || 'Дуже затишна міська пекарня'

	return (
		<>
			<Head>
				<script src="https://kit.fontawesome.com/680a166b6f.js" crossOrigin="anonymous"></script>
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
				<title>{title} | Міська пекарня</title>
				<meta name="keywords" content={keywords.join(',')} />
				<meta name="description" content={description} />
			</Head>
			<div className={classes.wrapper}>
				<div className={classes.container}>
					<Header />
					{children}
					<Footer />
				</div>
			</div>
		</>
	)
}
