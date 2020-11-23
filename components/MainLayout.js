import Head from 'next/head';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Header from './Header';
import Footer from './Footer';
import classes from '../styles/components/mainLayout.module.scss'

library.add(fab, faUser)

export default function MainLayout({children, title = 'Page', keywords = [], description}) {
	keywords = ['bakery', 'пекарня', 'місто', 'town', ...keywords]
	description = description || 'Very cozy town bakery'

	return (
		<>
			<Head>
				<script src="https://kit.fontawesome.com/680a166b6f.js" crossOrigin="anonymous"></script>
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
				<title>{title} | Town Bakery</title>
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
