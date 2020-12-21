import classes from '../../styles/AdminLayout/components/card.module.scss'

export default function Card({children}) {
	return (
		<div className={classes.card}>
			<div className={classes.cardContent}>
				{children}
			</div>
		</div>
	)
}
