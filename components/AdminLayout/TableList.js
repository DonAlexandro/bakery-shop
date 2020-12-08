import classes from '../../styles/AdminLayout/categories.module.scss';

export default function TableList({children, listHeader}) {
	return (
		<ul className={classes.tbList}>
			<li className={classes.tbListHead}>
				{listHeader.map((item, index) =>
					<div
						key={index}
						className={`${classes.tbCol} ${item.grow && classes.grow1}`}
					>{item.text}</div>
				)}
			</li>
			{children}
		</ul>
	)
}