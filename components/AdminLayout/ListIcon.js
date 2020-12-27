import classes from '../../styles/AdminLayout/components/listIcon.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function ListIcon({children}) {
	return (
		<ul className={classes.listIcon}>
			{children}
		</ul>
	)
}

export function Item({children, label, icon, color = 'primary'}) {
	const colors = {
		primary: classes.bgPrimaryPale,
		info: classes.bgInfoPale,
		pink: classes.bgPinkPale,
	}

	return (
		<li className={classes.listIconItem}>
			<div className={classes.info}>
				<span className={classes.label}>{label}</span>
				<span className={classes.count}>{children}</span>
			</div>
			<div className={[
				classes.icon,
				colors[color]
			].join(' ')}><FontAwesomeIcon icon={icon} /></div>
		</li>
	)
}
