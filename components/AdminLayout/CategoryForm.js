import classes from '../../styles/AdminLayout/components/forms/categoryForm.module.scss'

export default function CategoryForm() {
	return (
		<form className={classes.row}>
			<div className={classes.col12}>
				<div className={classes.formGroup}>
					<label htmlFor="name">Назва категорії</label>
					<input type="text" className={classes.formControl} name="name"/>
				</div>
			</div>
		</form>
	)
}