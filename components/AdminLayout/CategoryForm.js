import {useContext} from 'react';
import {useForm} from 'react-hook-form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classes from '../../styles/AdminLayout/components/rsForm.module.scss'
import {alertContext} from '../../context/alert/alertContext';
import {useCategory} from '../../hooks/useCategory';
import {loadingContext} from '../../context/loading/loadingContext';
import Button from './Button';
import {useDispatch} from 'react-redux';
import {addCategory, editCategory} from '../../redux/actions';

export default function CategoryForm({updateActive, category}) {
	const {register, handleSubmit, errors, reset} = useForm()
	const {showAlert} = useContext(alertContext)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)
	const {createCategory, updateCategory} = useCategory()

	const dispatch = useDispatch()

	const requestEnd = (message, type) => {
		showAlert(message, type)
		updateActive(false)
		hideLoading()
	}

	const onSubmit = (data, e) => {
		showLoading()

		if (category) {
			return updateCategory(data).then(response => {
				if (response?.error) {
					requestEnd(response.error.message, 'error')
				} else {
					requestEnd('Категорію успішно оновлено!', 'success')
					dispatch(editCategory(data))
					e.target.reset()
				}
			})
		}

		return createCategory(data).then(response => {
			if (response.error) {
				requestEnd(response.error.message, 'error')
			} else {
				requestEnd('Категорію успішно створено!', 'success')
				dispatch(addCategory(response))
			}
		})
	}

	return (
		<div className={classes.formContent}>
			<div className={classes.blockHead}>
				<h5 className={classes.blockHeadTitle}>Нова категорія</h5>
				<p className={classes.blockHeadSubtitle}>Впишіть інформацію і створіть категорію</p>
			</div>
			<form className={classes.row} onSubmit={handleSubmit(onSubmit)}>
				<div className={classes.col12}>
					{category && <input
						type="hidden"
						name="id"
						defaultValue={category.id}
						ref={register}
					/>}
					<div className={classes.formGroup}>
						<label htmlFor="name">Назва категорії</label>
						<input
							type="text"
							className={classes.formControl}
							name="name"
							defaultValue={category && category.name}
							ref={register({
								required: 'Введіть, будь ласка, назву категорії'
							})}
						/>
						{errors.name && <span className={classes.invalidFeedback}>{errors.name.message}</span>}
					</div>
				</div>
				<div className={classes.col12}>
					<Button
						styles={[classes.btn, classes.btnPrimary]}
						loading={loading}
					>
						<span className={classes.icon}><FontAwesomeIcon icon={category ? 'edit' : 'plus'} /></span>
						<span className={classes.text}>{category ? 'Оновити' : 'Створити'}</span>
					</Button>
				</div>
			</form>
		</div>
	)
}