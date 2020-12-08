import classes from '../../styles/AdminLayout/categories.module.scss';

export default function RightSidebar({children, options}) {
	const hideSlider = target => {
		if (target.classList.contains(classes.toggleActive)) {
			options.toggleSidebar(false)
		}
	}

	return (
		<div
			onClick={e => hideSlider(e.target)}
			className={`${classes.toggleSlide} ${options.active && classes.toggleActive}`}
		>
			<div className={classes.slideWrapper}>
				{children}
			</div>
		</div>
	)
}