import classes from '../../../../styles/AdminLayout/components/forms.module.scss';

export default function Select({children, id, onRef, name}) {
	return (
		<div className={classes.formControlSelect}>
			<select
				name={name}
				id={id}
				className={classes.formControl}
				ref={onRef}
			>
				{children}
			</select>
		</div>
	)
}
