import MainLayout from '../../components/MainLayout';
import classes from '../../styles/contacts.module.scss'

export default function Contacts() {
	return (
		<MainLayout>
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Контакти</h5>
				</div>
				<form className={classes.form}>
					<p>Плануєте особливий захід? Давайте обговоримо:</p>
					<div className={classes.row}>
						<div className={classes.col3}>
							<input
								type="text"
								placeholder="Ім'я"
								name="name"
								className={classes.formControl}
							/>
						</div>
						<div className={classes.col3}>
							<input
								type="email"
								placeholder="Ел. пошта"
								name="email"
								className={classes.formControl}
							/>
						</div>
						<div className={classes.col3}>
							<input
								type="number"
								placeholder="Телефон"
								name="phone"
								className={classes.formControl}
							/>
						</div>
					</div>
					<textarea
						name="message"
						placeholder="Напишіть повідомлення..."
						className={classes.formControl}
					></textarea>
					<button className={`${classes.btn} ${classes.btnPrimary}`}>Відправити</button>
				</form>
			</div>
		</MainLayout>
	)
}