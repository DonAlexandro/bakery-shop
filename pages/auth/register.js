import {useContext} from 'react'
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import MainLayout from '../../components/MainLayout/MainLayout'
import classes from '../../styles/MainLayout/auth.module.scss'
import Alert from '../../components/Alert';
import {alertContext} from '../../context/alert/alertContext';
import {useAuth} from '../../hooks/useAuth';
import Button from '../../components/MainLayout/Button';
import {loadingContext} from '../../context/loading/loadingContext';

export default function Register() {
	const router = useRouter()
	const {showAlert} = useContext(alertContext)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)
	const {register, handleSubmit, errors} = useForm()
	const {signUp} = useAuth()

	const onSubmit = data => {
		showLoading()
		return signUp(data).then(response => {
			if (response.error) {
				showAlert(response.error.message, 'error')
				hideLoading()
			} else {
				showAlert('Ви успішно зареєструвалися!', 'success')
				router.push('/auth/profile')
				setTimeout(() => hideLoading(), 1500)
			}
		})
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
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
						{/*-------------------NAME&LAST_NAME---------------------*/}
						<div className={classes.row}>
							<div className={classes.col2}>
								<div className={classes.formGroup}>
									<input
										type="text"
										name="name"
										placeholder="Ім'я"
										autoComplete="off"
										className={`${classes.formControl} ${errors.name ? classes.formInvalid : ''}`}
										ref={register({
											required: `Введіть, будь ласка, ваше ім'я`
										})}
									/>
									<span
										className={`${classes.textHelper} ${classes.red}`}
									>{errors.name ? errors.name.message : ''}</span>
								</div>
							</div>
							<div className={classes.col2}>
								<div className={classes.formGroup}>
									<input
										type="text"
										name="lastName"
										placeholder="Прізвище"
										autoComplete="off"
										className={`${classes.formControl} ${errors.lastName ? classes.formInvalid : ''}`}
										ref={register({
											required: `Введіть, будь ласка, ваше прізвище`
										})}
									/>
									<span
										className={`${classes.textHelper} ${classes.red}`}
									>{errors.lastName ? errors.lastName.message : ''}</span>
								</div>
							</div>
						</div>
						{/*-------------------------------------------------------*/}

						{/*---------------------CITY&REGION-----------------------*/}
						<div className={classes.row}>
							<div className={classes.col2}>
								<div className={classes.formGroup}>
									<input
										type="text"
										name="region"
										placeholder="Область"
										autoComplete="off"
										className={`${classes.formControl} ${errors.region ? classes.formInvalid : ''}`}
										ref={register({
											required: `Введіть, будь ласка, вашу область`
										})}
									/>
									<span
										className={`${classes.textHelper} ${classes.red}`}
									>{errors.region ? errors.region.message : ''}</span>
								</div>
							</div>
							<div className={classes.col2}>
								<div className={classes.formGroup}>
									<input
										type="text"
										name="city"
										placeholder="Місто"
										autoComplete="off"
										className={`${classes.formControl} ${errors.city ? classes.formInvalid : ''}`}
										ref={register({
											required: `Введіть, будь ласка, ваше місто`
										})}
									/>
									<span
										className={`${classes.textHelper} ${classes.red}`}
									>{errors.city ? errors.city.message : ''}</span>
								</div>
							</div>
						</div>
						{/*-------------------------------------------------------*/}

						{/*------------------------EMAIL--------------------------*/}
						<div className={classes.formGroup}>
							<input
								type="email"
								placeholder="Ел. адреса"
								name="email"
								autoComplete="off"
								className={`${classes.formControl} ${errors.email ? classes.formInvalid : ''}`}
								ref={register({
									required: 'Введіть, будь ласка, ваш Email',
									validate: (value) => {
										return (
											/.+@.+\..+/i.test(value)
										) || 'Введіть, будь ласка, коректний Email'
									}
								})}
							/>
							<span
								className={`${classes.textHelper} ${classes.red}`}
							>{errors.email ? errors.email.message : ''}</span>
						</div>
						{/*------------------------------------------------------*/}

						{/*----------------------PASSWORD------------------------*/}
						<div className={classes.formGroup}>
							<input
								type="password"
								placeholder="Пароль"
								name="password"
								className={`${classes.formControl} ${errors.password ? classes.formInvalid : ''}`}
								autoComplete="off"
								ref={register({
									required: 'Введіть, будь ласка, пароль',
									minLength: {value: 8, message: 'Пароль повинен містити мінімум 8 символів'}
								})}
							/>
							<span
								className={`${classes.textHelper} ${classes.red}`}
							>{errors.password ? errors.password.message : ''}</span>
						</div>
						{/*-------------------------------------------------------*/}

						<Button
							text={'Зареєструватися'}
							styles={[classes.btn, classes.btnPrimary]}
							loading={loading}/>
					</form>
					<div className={classes.block}>
						<p>Вже маєте обліковий запис?</p>
						<Link href={'/auth/login'}>
							<a className={`${classes.btnBlock} ${classes.btnPrimary}`}>
								Увійти
							</a>
						</Link>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
