import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MainLayout from '../../components/MainLayout'
import classes from '../../styles/auth.module.scss'

export default function Login() {
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
						<div className={[classes.dFlex, classes.spaceBetween, classes.alignCenter].join(' ')}>
							<button className={`${classes.btn} ${classes.btnPrimary}`}>Увійти</button>
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
					<p>Вхід за допомогою соц. мереж</p>
					<div className={classes.row}>
						<div className={classes.col2}>
							<button className={`${classes.btnBlock} ${classes.btnOutlinePrimary}`}>
								<FontAwesomeIcon icon={['fab', 'google']} />
							</button>
						</div>
						<div className={classes.col2}>
							<button className={`${classes.btnBlock} ${classes.btnOutlinePrimary}`}>
								<FontAwesomeIcon icon={['fab', 'instagram']} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}