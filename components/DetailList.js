import classes from '../styles/detailList.module.scss'

export default function DetailList({children, design}) {
	const designs = {
		admin: classes.admin,
		main: classes.main
	}

	return (
		<ul className={[
			classes.detailList,
			designs[design || 'admin']
		].join(' ')}>
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
