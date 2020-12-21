import classes from '../../styles/AdminLayout/components/common.module.scss'

export default function DetailList({children}) {
	return (
		<ul className={classes.detailList}>
			{children}
		</ul>
	)
}

export function Item({label, children}) {
	return (
		<li className={classes.dlItem}>
			<span className={classes.dlLabel}>{label}</span>
			<span className={classes.dlValue}>{children}</span>
		</li>
	)
}
