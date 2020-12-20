import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {useContext} from 'react'
import MainLayout from '../../components/MainLayout/MainLayout';
import classes from '../../styles/MainLayout/auth.module.scss'
import {useAuth} from '../../hooks/useAuth';
import {alertContext} from '../../context/alert/alertContext'
import Link from 'next/link';
import {loadingContext} from '../../context/loading/loadingContext';
import Button from '../../components/MainLayout/Button';

export default function Recovery() {
	const {register, handleSubmit, errors} = useForm()
	const {sendPasswordResetEmail} = useAuth()
	const {showAlert} = useContext(alertContext)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)
	const router = useRouter()

	const onSubmit = ({email}) => {
		showLoading()
		return sendPasswordResetEmail(email).then(response => {
			if (response.error) {
				showAlert(response.error.message, 'error')
				hideLoading()
			} else {
				showAlert('На вашу пошту вислано повідомлення з подальшими діями', 'success')
				router.push('/auth/login')
				setTimeout(() => hideLoading(), 1500)
			}
		})
	}

	return (
		<MainLayout>
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Відновлення паролю</h5>
				</div>
				<div className={classes.wrapper}>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={classes.formGroup}>
							<input
								type="email"
								name="email"
								placeholder="Ваш ел. адрес"
								className={`${classes.formControl} ${errors.email ? classes.formInvalid : ''}`}
								ref={register({
									required: 'Введіть, будь ласка, ваш ел. адрес',
									pattern: {
										value: /.+@.+\..+/,
										message: 'Введіть, будь ласка, коректний ел. адрес'
									}
								})}
							/>
							<span
								className={`${classes.textHelper} ${classes.red}`}
							>{errors.email ? errors.email.message : ''}</span>
						</div>
						<Button
							text={'Відновити'}
							loading={loading}
							styles={[classes.btn, classes.btnPrimary]}/>
					</form>
					<div className={classes.block}>
						<p>Нічого не забували?</p>
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