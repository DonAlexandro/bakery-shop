import classes from '../styles/components/footer.module.scss'

export default function Footer() {
	const cols = [
		{title: 'Адрес', text: ['ул. Хрещатик, 1а,', 'Київ, Україна']},
		{title: 'Години роботи', text: ['ПН–ПТ: 12:00–23:00', 'СБ и ВС: 11:00–00:00']},
		{title: 'Контакти', text: ['+38(097)-30-123-29', 'info@mysite.ru']},
	]

	return (
		<footer className={classes.footer}>
			<div className={classes.row}>
				{cols.map((col, index) =>
					<div className={classes.col} key={index}>
						<h6>{col.title}</h6>
						<p>{col.text.join('\n')}</p>
					</div>
				)}
			</div>
			<p className={classes.copyright}>&copy; {new Date().getFullYear()} Міська пекарня</p>
		</footer>
	)
}