import classes from '../../styles/AdminLayout/components/card.module.scss'

export default function Card({children, dark}) {
	return (
		<div className={[
			classes.card,
			dark && classes.cardDark
		].join(' ')}>
			<div className={classes.cardContent}>
				{children}
			</div>
		</div>
	)
}

export function Amount({children}) {
	return (
		<div className={classes.amount}>
			{children}
		</div>
	)
}
