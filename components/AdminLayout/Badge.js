import classes from '../../styles/AdminLayout/components/badge.module.scss'

export default function Badge({children, color}) {
	const colors = {
		warning: classes.badgeWarning,
		success: classes.badgeSuccess,
		info: classes.badgeInfo,
		danger: classes.badgeDanger,
	}

	return (
		<span
			className={[
				classes.badge,
				colors[color]
			].join(' ')}
		>{children}</span>
	)
}