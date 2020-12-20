import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MainLayout from '../../components/MainLayout/MainLayout'
import classes from '../../styles/MainLayout/profile.module.scss'
import {useRequireAuth} from '../../hooks/useRequireAuth'
import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
	const {user} = useRequireAuth()

	if (!user) return null

	return (
		<MainLayout
			title={'Профіль користувача'}
			keywords={['profile', 'профиль', user.name, user.lastName]}
			description={`Профіль користувача ${user.name} ${user.lastName}`}
		>
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Ваш профіль</h5>
				</div>
				<div className={classes.profile}>
					<div className={classes.info}>
						<Image
							src={user.photoURL || '/thumb-user.jpg'}
							alert={user.email}
							width={150}
							height={150}
						/>
						<h6 className={classes.userName}>{user.name} {user.lastName}</h6>
						<span className={classes.subTitle}>{user.email}</span>
						<ul className={classes.additionalInfo}>
							<li><FontAwesomeIcon icon="home"/><span>м. {user.city}, обл. {user.region}</span></li>
							<li>
								{user.emailVerified
									? <><FontAwesomeIcon icon="user-plus"/><span>Аканут підтверджений!</span></>
									: <><FontAwesomeIcon icon="user-times"/><span>Акаунт не підтверджений :(</span></>
								}
							</li>
							{user.isAdmin && <li><FontAwesomeIcon icon="cog"/><Link href={'/admin'}>Адмін панель</Link></li>}
						</ul>
					</div>
					<div className={classes.orders}>
						<h3 className={classes.textCenter}>Ваші замовлення</h3>
						<div className={classes.empty}>
							<Image
								src="/box.png"
								alert="orders is empty"
								width={200}
								height={200}
							/>
							<p>Ви ще не зробили жодного замовлення</p>
						</div>
						{/*<ul className={classes.ordersList}>*/}
						{/*	<li>*/}
						{/*		<span>#</span>*/}
						{/*		<span>Код замовлення</span>*/}
						{/*		<span>Статус замовлення</span>*/}
						{/*	</li>*/}
						{/*	<li>*/}
						{/*		<span>1</span>*/}
						{/*		<span>*/}
						{/*			<Link href={'/order/[id]'}>Замовлення #12345678</Link>*/}
						{/*		</span>*/}
						{/*		<span><FontAwesomeIcon icon="clipboard-list"/>Прийнято</span>*/}
						{/*	</li>*/}
						{/*	<li>*/}
						{/*		<span>2</span>*/}
						{/*		<span>*/}
						{/*			<Link href={'/order/[id]'}>Замовлення #12345678</Link>*/}
						{/*		</span>*/}
						{/*		<span><FontAwesomeIcon icon="clipboard-check"/>Оброблено</span>*/}
						{/*	</li>*/}
						{/*	<li>*/}
						{/*		<span>3</span>*/}
						{/*		<span>*/}
						{/*			<Link href={'/order/[id]'}>Замовлення #12345678</Link>*/}
						{/*		</span>*/}
						{/*		<span><FontAwesomeIcon icon="truck"/>Відправлено</span>*/}
						{/*	</li>*/}
						{/*</ul>*/}
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
