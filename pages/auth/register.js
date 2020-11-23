import {useState, useEffect} from 'react'
import MainLayout from '../../components/MainLayout'
import classes from '../../styles/auth.module.scss'
import Alert from '../../components/Alert';

export default function Register() {
	const [notification, setNotification] = useState({
		type: 'warning',
		text: ''
	})

	return (
		<MainLayout>
			<Alert text={notification.text} type={notification.type}/>
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Реєстрація</h5>
				</div>
				<div className={classes.wrapper}>
					<form className={classes.form}>
						<input
							type="email"
							className={classes.formControl}
							name="email"
							placeholder="Ел. адрес"
						/>
						<input
							type="password"
							className={classes.formControl}
							name="password"
							placeholder="Пароль"
						/>
						<input
							type="password"
							className={classes.formControl}
							name="passConf"
							placeholder="Повторіть пароль"
						/>
						<button className={`${classes.btn} ${classes.btnPrimary}`}>Зареєструватися</button>
					</form>
				</div>
			</div>
		</MainLayout>
	)
}