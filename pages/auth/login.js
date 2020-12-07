import Link from 'next/link';
import {useContext} from 'react'
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import MainLayout from '../../components/MainLayout/MainLayout'
import classes from '../../styles/MainLayout/auth.module.scss'
import {useAuth} from '../../hooks/useAuth';
import {alertContext} from '../../context/alert/alertContext'
import {loadingContext} from '../../context/loading/loadingContext';
import Button from '../../components/MainLayout/Button';

export default function Login() {
	const router = useRouter()
	const {register, handleSubmit, errors} = useForm()
	const {signIn} = useAuth()
	const {showAlert} = useContext(alertContext)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)

	const onSubmit = data => {
		showLoading()
		return signIn(data).then(response => {
			if (response.error) {
				showAlert(response.error.message, 'error')
				hideLoading()
			} else {
				showAlert('Раді вас бачити!', 'success')
				router.push('/auth/profile')
				setTimeout(() => hideLoading(), 1500)
			}
		})
	}

	return (
		<MainLayout
			title={'Вхід'}
			keywords={['login', 'вхід']}
			description={'Сторінка входу в обліковий запис'}
		>
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Вхід</h5>
				</div>
				<div className={classes.wrapper}>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
						<div className={classes.formGroup}>
							<input
								type="email"
								name="email"
								placeholder="Ел. адрес"
								className={`${classes.formControl} ${errors.email ? classes.formInvalid : ''}`}
								ref={register({
									required: 'Введіть, будь ласка, ваш ел. адрес',
									pattern: {
										value: /.+@.+\..+/,
										message: 'Введіть корректний ел. адрес'
									}
								})}
							/>
							<span
								className={`${classes.textHelper} ${classes.red}`}
							>{errors.email ? errors.email.message : ''}</span>
						</div>
						<div className={classes.formGroup}>
							<input
								type="password"
								name="password"
								placeholder="Пароль"
								className={`${classes.formControl} ${errors.password ? classes.formInvalid : ''}`}
								ref={register({
									required: 'Введіть, будь ласка, ваш пароль',
									minLength: {
										value: 8,
										message: 'Пароль повинен містити не менше 8 символів'
									}
								})}
							/>
							<span
								className={`${classes.textHelper} ${classes.red}`}
							>{errors.password ? errors.password.message : ''}</span>
						</div>
						<div className={[classes.dFlex, classes.spaceBetween, classes.alignCenter].join(' ')}>
							<Button
								text={'Увійти'}
								loading={loading}
								styles={[classes.btn, classes.btnPrimary]}/>
							<Link href={'/auth/recovery'}>Забули пароль?</Link>
						</div>
					</form>
					<div className={classes.block}>
						<p>Ще не маєте облікового запису?</p>
						<Link href={'/auth/register'}>
							<a className={`${classes.btnBlock} ${classes.btnPrimary}`}>
								Зареєструватися
							</a>
						</Link>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
