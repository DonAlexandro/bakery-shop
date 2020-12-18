import {useContext} from 'react';
import {useForm} from 'react-hook-form';
import classes from '../../../styles/AdminLayout/components/rsForm.module.scss'
import button from '../../../styles/AdminLayout/components/rsForm.module.scss'
import {alertContext} from '../../../context/alert/alertContext';
import {useCategory} from '../../../hooks/useCategory';
import {loadingContext} from '../../../context/loading/loadingContext';
import Button from '../Button';
import {useDispatch} from 'react-redux';
import {addCategory, editCategory} from '../../../redux/actions';
import FormLayout from './FormLayout';

export default function CategoryForm({toggleSidebar, category}) {
	const {register, handleSubmit, errors} = useForm()
	const {showAlert} = useContext(alertContext)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)
	const {createCategory, updateCategory} = useCategory()

	const dispatch = useDispatch()

	const requestEnd = (message, type, form) => {
		showAlert(message, type)
		toggleSidebar(false)
		hideLoading()
		form.reset()
	}

	const onSubmit = (data, e) => {
		showLoading()

		if (category) {
			return updateCategory(data).then(response => {
				if (response?.error) {
					requestEnd(response.error.message, 'error', e.target)
				} else {
					requestEnd('Категорію успішно оновлено!', 'success', e.target)
					dispatch(editCategory(data))
				}
			})
		}

		return createCategory(data).then(response => {
			if (response.error) {
				requestEnd(response.error.message, 'error', e.target)
			} else {
				requestEnd('Категорію успішно створено!', 'success', e.target)
				dispatch(addCategory(response))
			}
		})
	}

	return (
		<FormLayout
			title="Нова категорія"
			subtitle="Впишіть інформацію і створіть нову категорію"
		>
			<form className={classes.row} onSubmit={handleSubmit(onSubmit)}>
				<div className={classes.col12}>
					{category && <input
						type="hidden"
						name="id"
						defaultValue={category.id}
						ref={register}
					/>}
					<div className={classes.formGroup}>
						<label htmlFor="name" className={classes.label}>Назва категорії</label>
						<input
							type="text"
							className={classes.formControl}
							name="name"
							defaultValue={category ? category.name : ''}
							ref={register({
								required: 'Введіть, будь ласка, назву категорії'
							})}
						/>
						{errors.name && <span className={classes.invalidFeedback}>{errors.name.message}</span>}
					</div>
				</div>
				<div className={classes.col12}>
					<Button
						color="primary"
						loading={loading}
						icon={category ? 'edit' : 'plus'}
					>{category ? 'Оновити' : 'Створити'}</Button>
				</div>
			</form>
		</FormLayout>
	)
}