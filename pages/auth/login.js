import Link from 'next/link';
import {useContext, useEffect} from 'react'
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import MainLayout from '../../components/MainLayout/MainLayout'
import classes from '../../styles/MainLayout/auth.module.scss'
import {useAuth} from '../../hooks/useAuth';
import {alertContext} from '../../context/alert/alertContext'
import {loadingContext} from '../../context/loading/loadingContext';
import Button from '../../components/MainLayout/Button';
import Alert from '../../components/Alert';

export default function Login() {
	const router = useRouter()
	const {register, handleSubmit, errors} = useForm()
	const {signIn} = useAuth()
	const {showAlert} = useContext(alertContext)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)

	useEffect(() => {
		router.prefetch('/auth/profile')
	}, [])

	const onSubmit = data => {
		showLoading()
		return signIn(data).then(response => {
			if (response.error) {
				showAlert(response.error.message, 'error')
				hideLoading()
			} else {
				showAlert('Раді вас бачити!', 'success', true)
				router.push('/auth/profile')
				setTimeout(() => hideLoading(), 2000)
			}
		})
	}

	return (
		<MainLayout
			title={'Вхід'}
			keywords={['login', 'вхід']}
			description={'Сторінка входу в обліковий запис'}
		>
			<Alert />
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
								loading={loading}
								actions={{
									onClick: () => {}
								}}
								color="primary"
							>Увійти</Button>
							<Link href={'/auth/recovery'}>Забули пароль?</Link>
						</div>
					</form>
					<div className={classes.block}>
						<p>Ще не маєте облікового запису?</p>
						<Button
							tag="a"
							link={{
								href: '/auth/register'
							}}
							styles={{
								block: true
							}}
						>Зареєструватися</Button>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
