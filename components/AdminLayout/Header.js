import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classes from '../../styles/AdminLayout/components/header.module.scss'
import {useAuth} from '../../hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
	const [dropdown, setDropdown] = useState(false)
	const {user, signOut} = useAuth()

	return (
		<header className={`${classes.header} ${classes.shadowSm}`}>
			<div className={classes.containerFluid}>
				<div className={classes.headerWrap}>
					<form className={classes.headerSearch}>
						<FontAwesomeIcon icon="search" className={classes.icon} />
						<input
							type="text"
							placeholder="Найдіть те, що вам потрібно..."
							className={`${classes.formControl} ${classes.borderTransparent}`}
						/>
					</form>
					{/*{user && <div className={classes.headerTools}>*/}
					{/*	<div className={`${classes.dropdown} ${classes.userDropdown}`}>*/}
					{/*		<div className={classes.userToggle} onClick={() => setDropdown(prev => prev = !prev)}>*/}
					{/*			<div className={[*/}
					{/*				classes.userAvatar,*/}
					{/*				classes.rounded,*/}
					{/*				classes.bgPurple*/}
					{/*			].join(' ')}>*/}
					{/*				<FontAwesomeIcon icon="user" />*/}
					{/*			</div>*/}
					{/*			<div className={classes.userInfo}>*/}
					{/*				<span className={classes.userStatus}>Адміністратор</span>*/}
					{/*				<div className={`${classes.userName}`}>*/}
					{/*					{user.name} {user.lastName}*/}
					{/*					<span className={classes.dropdownIndicator}>*/}
					{/*						<FontAwesomeIcon icon={dropdown ? 'angle-up' : 'angle-down'} />*/}
					{/*					</span>*/}
					{/*				</div>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*		<div className={[*/}
					{/*			classes.dropdownMenu,*/}
					{/*			classes.dropdownMenuMd,*/}
					{/*			classes.shadowLg,*/}
					{/*			classes.dropdownMenuRight,*/}
					{/*			dropdown ? classes.show : classes.hide*/}
					{/*		].join(' ')}>*/}
					{/*			<div className={`${classes.dropdownInner} ${classes.userCardWrap}`}>*/}
					{/*				<div className={[*/}
					{/*					classes.userAvatar,*/}
					{/*					classes.rounded,*/}
					{/*					classes.fwMedium,*/}
					{/*					classes.bgPurple*/}
					{/*				].join(' ')}>*/}
					{/*					{user.photoURL*/}
					{/*						? <Image*/}
					{/*							src={user.photoURL}*/}
					{/*							alert={user.email}*/}
					{/*							width={40}*/}
					{/*							height={40}*/}
					{/*						  />*/}
					{/*						: <>{user.name[0]}{user.lastName[0]}</>*/}
					{/*					}*/}
					{/*				</div>*/}
					{/*				<div className={classes.userInfo}>*/}
					{/*					<div className={classes.leadText}>{user.name} {user.lastName}</div>*/}
					{/*					<div className={classes.subText}>{user.email}</div>*/}
					{/*				</div>*/}
					{/*			</div>*/}
					{/*			<div className={`${classes.dropdownInner}`}>*/}
					{/*				<ul className={classes.linksList}>*/}
					{/*					<li>*/}
					{/*						<Link href={'/admin/profile'}>*/}
					{/*							<a>*/}
					{/*								<span className={classes.icon}><FontAwesomeIcon icon="user" /></span>*/}
					{/*								<span className={classes.text}>Профіль</span>*/}
					{/*							</a>*/}
					{/*						</Link>*/}
					{/*					</li>*/}
					{/*					<li>*/}
					{/*						<Link href={'/admin/profile/settings'}>*/}
					{/*							<a>*/}
					{/*								<span className={classes.icon}><FontAwesomeIcon icon="cog" /></span>*/}
					{/*								<span className={classes.text}>Налаштування</span>*/}
					{/*							</a>*/}
					{/*						</Link>*/}
					{/*					</li>*/}
					{/*				</ul>*/}
					{/*			</div>*/}
					{/*			<div className={`${classes.dropdownInner}`}>*/}
					{/*				<ul className={classes.linksList}>*/}
					{/*					<li>*/}
					{/*						<a onClick={() => signOut()}>*/}
					{/*							<span className={classes.icon}><FontAwesomeIcon icon="sign-out-alt" /></span>*/}
					{/*							<span className={classes.text}>Вийти</span>*/}
					{/*						</a>*/}
					{/*					</li>*/}
					{/*				</ul>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*</div>}*/}
				</div>
			</div>
		</header>
	)
}