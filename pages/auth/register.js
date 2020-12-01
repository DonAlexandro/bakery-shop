import {useContext} from 'react'
import MainLayout from '../../components/MainLayout'
import classes from '../../styles/auth.module.scss'
import Alert from '../../components/Alert';
import firebase from '../../config/firebaseConfig';
import {useInput} from '../../hooks/useInput';
import {alertContext} from '../../context/alert/alertContext';

export default function Register() {
	const {showAlert} = useContext(alertContext)

	const email = useInput()
	const password = useInput()
	const passConf = useInput()

	const submitHandler = e => {
		e.preventDefault()
	}

	return (
		<MainLayout
			title={'Реєстрація'}
			keywords={['registration', 'реєстрація']}
			description={'Сторінка реєстрації облікового запису'}
		>
			<Alert />
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Реєстрація</h5>
				</div>
				<div className={classes.wrapper}>
					<form className={classes.form} onSubmit={submitHandler}>
						<input
							type="email"
							placeholder="Ел. адрес"
							className={classes.formControl}
							{...email.bind}
						/>
						<input
							type="password"
							placeholder="Пароль"
							className={classes.formControl}
							{...password.bind}
						/>
						<input
							type="password"
							placeholder="Повторіть пароль"
							className={classes.formControl}
							{...passConf.bind}
						/>
						<button className={`${classes.btn} ${classes.btnPrimary}`}>Зареєструватися</button>
					</form>
				</div>
			</div>
		</MainLayout>
	)
}