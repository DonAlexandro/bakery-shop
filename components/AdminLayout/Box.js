import classes from '../../styles/utils/spaces.module.scss'

export default function Box({children, m}) {
	const margins = {
		mb3: classes.mb3,
		mb4: classes.mb4,
	}

	const attrs = {
		className: [
			m && margins[m]
		].join(' ')
	}

	return (
		<div {...attrs}>{children}</div>
	)
}
