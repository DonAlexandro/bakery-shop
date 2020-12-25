import {useContext} from 'react';
import {useForm} from 'react-hook-form';
import {alertContext} from '../../../context/alert/alertContext';
import {useCategory} from '../../../hooks/useCategory';
import {loadingContext} from '../../../context/loading/loadingContext';
import Button from '../Button';
import {useDispatch} from 'react-redux';
import {addCategory, editCategory} from '../../../redux/actions';
import FormLayout from './FormLayout';
import {Col12, Row} from '../../Grid';
import Input, {FormGroup, HelperText, Label} from './components/Input';

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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<Col12>
						{category && <Input
							type="hidden"
							name="id"
							value={category.id}
							onRef={register}
						/>}
						<FormGroup>
							<Label inputName="name">Назва категорії</Label>
							<Input
								type="text"
								name="name"
								id="name"
								value={category ? category.name : ''}
								onRef={register({
									required: 'Введіть, будь ласка, назву категорії'
								})}
							/>
							{errors.name && <HelperText>{errors.name.message}</HelperText>}
						</FormGroup>
					</Col12>
					<Col12>
						<Button
							loading={loading}
							icon={category ? 'edit' : 'plus'}
						>{category ? 'Оновити' : 'Створити'}</Button>
					</Col12>
				</Row>
			</form>
		</FormLayout>
	)
}