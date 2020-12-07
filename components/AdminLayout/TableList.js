import classes from '../../styles/AdminLayout/categories.module.scss';

export default function TableList({children}) {
	return (
		<ul className={classes.tbList}>
			<li className={classes.tbListHead}>
				<div className={`${classes.tbCol}`}>#</div>
				<div className={`${classes.tbCol} ${classes.grow1}`}>Назва категорії</div>
			</li>
			{children}
		</ul>
	)
}