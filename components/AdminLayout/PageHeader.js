import classes from '../../styles/AdminLayout/components/common.module.scss';

export default function PageHeader({children}) {
	return (
		<div className={classes.pageHeader}>
			{children}
		</div>
	)
}

export function Title({children, tag = 'h3', small, subtitle}) {
	const content = (
		<div>
			{children}
			{small && ' / '}
			{small && <small className={`${classes.textPrimary} ${classes.small}`}>{small}</small>}
		</div>
	)

	const tags = {
		h3: <h3>{content}</h3>,
		h5: <h5>{content}</h5>,
		h6: <h6>{content}</h6>
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
