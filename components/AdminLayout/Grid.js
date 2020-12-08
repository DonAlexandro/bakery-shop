import classes from '../../styles/AdminLayout/components/grid.module.scss'

export const Row = ({children}) => {
	return (
		<div className={classes.row}>
			{children}
		</div>
	)
}

export const Col12 = ({children}) => {
	return (
		<div className={classes.col12}>
			{children}
		</div>
	)
}

export const Col6 = ({children}) => {
	return (
		<div className={classes.col6}>
			{children}
		</div>
	)
}
