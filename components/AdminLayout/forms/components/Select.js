import classes from '../../../../styles/AdminLayout/components/forms.module.scss';

export default function Select({children, id, onRef, styles, name, value}) {
	return (
		<div className={classes.formControlSelect}>
			<select
				name={name}
				id={id}
				className={styles.join(' ')}
				defaultValue={value && value}
				ref={onRef}
			>
				{children}
			</select>
		</div>
	)
}
