import classes from '../styles/utils/spaces.module.scss'
import flex from '../styles/AdminLayout/components/flex.module.scss'

export default function Box({children, m, center}) {
	const margins = {
		mt4: classes.mt4,
		mt5: classes.mt5,
		mb3: classes.mb3,
		mb4: classes.mb4,
		mb5: classes.mb5,
	}

	const centres = {
		center: flex.center
	}

	const attrs = {
		className: [
			m && margins[m],
			center && centres[center]
		].join(' ')
	}

	return (
		<div {...attrs}>{children}</div>
	)
}
