import classes from '../../styles/MainLayout/components/footer.module.scss'
import {db} from '../../config/firebaseConfig';
import {useEffect, useState} from 'react';

export default function Footer() {
	const [settings, setSettings] = useState({})

	useEffect(() => {
		async function load() {
			await db.collection('settings').doc(process.env.SETTINGS_ID).get().then(doc => {
				setSettings(doc.data())
			})
		}

		load()
	}, [])

	const cols = [
		{title: 'Адрес', text: settings.address},
		{title: 'Години роботи', text: settings.hours},
		{title: 'Контакти', text: settings.contacts},
	]

	return (
		<footer className={classes.footer}>
			<div className={classes.row}>
				{cols.map((col, index) =>
					<div className={classes.col} key={index}>
						<h6>{col.title}</h6>
						<p>{col.text}</p>
					</div>
				)}
			</div>
			<p className={classes.copyright}>{settings.copyright}</p>
		</footer>
	)
}
