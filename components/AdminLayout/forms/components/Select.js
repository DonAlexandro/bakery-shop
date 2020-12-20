import classes from '../../../../styles/AdminLayout/components/forms.module.scss';

export default function Select({children, id, onRef, styles, name}) {
	return (
		<div className={classes.formControlSelect}>
			<select
				name={name}
				id={id}
				className={styles.join(' ')}
				ref={onRef}
			>
				{children}
			</select>
		</div>
	)
}
