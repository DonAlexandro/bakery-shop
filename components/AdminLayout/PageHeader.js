import classes from '../../styles/AdminLayout/categories.module.scss';

export default function PageHeader({children, title}) {
	return (
		<div className={classes.pageHeader}>
			<div className={classes.pageHeaderContent}>
				<h3>{title}</h3>
			</div>
			<div className={classes.pageHeaderContent}>
				<ul className={classes.blockTools}>
					{children}
				</ul>
			</div>
		</div>
	)
}