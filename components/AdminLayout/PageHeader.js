import classes from '../../styles/AdminLayout/components/common.module.scss';

export default function PageHeader({children}) {
	return (
		<div className={classes.pageHeader}>
			{children}
		</div>
	)
}

export function Title({children, tag = 'h3', small, subtitle, styles = {}}) {
	const content = (
		<>
			{children}
			{small && ' / '}
			{small && <small className={`${classes.textPrimary} ${classes.small}`}>{small}</small>}
		</>
	)

	const colors = {
		white: classes.textWhite
	}

	const attrs = {
		className: [
			styles.color && colors[styles.color]
		].join(' ')
	}

	const tags = {
		h3: <h3 {...attrs}>{content}</h3>,
		h5: <h5 {...attrs}>{content}</h5>,
		h6: <h6 {...attrs}>{content}</h6>
	}

	return (
		<div>
			{tags[tag]}
			{subtitle && <p className={classes.subtitle}>{subtitle}</p>}
		</div>
	)
}

export function Tools({children}) {
	return (
		<div>
			<ul className={classes.blockTools}>
				{children}
			</ul>
		</div>
	)
}
