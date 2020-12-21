import classes from '../../styles/AdminLayout/components/common.module.scss'

export default function Jumbotron({children}) {
	return (
		<div className={classes.jumbotron}>
			{children}
		</div>
	)
}
