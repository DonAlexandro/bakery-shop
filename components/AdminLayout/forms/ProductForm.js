import {useForm} from 'react-hook-form';
import {useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import FormLayout from './FormLayout';
import classes from '../../../styles/AdminLayout/components/rsForm.module.scss';
import {Col12, Col6, Row} from '../Grid';
import Button from '../Button';
import {loadingContext} from '../../../context/loading/loadingContext';
import {wrapper} from '../../../redux/store';
import {db} from '../../../config/firebaseConfig';
import {setCategories} from '../../../redux/actions';

export default function ProductForm() {
	const {register, handleSubmit, errors} = useForm()
	const {loading, showLoading} = useContext(loadingContext)

	const categories = useSelector(state => state.categories.categories)

	useEffect(() => {
		console.log(categories)
	}, [categories])

	const onSubmit = data => {
		console.log(data)
	}

	return (
		<FormLayout
			title="Новий товар"
			subtitle="Впишіть інформацію і додайте новий товар"
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<Col12>
						<div className={classes.formGroup}>
							<label htmlFor="name">Назва товару</label>
							<input
								id="name"
								type="text"
								name="name"
								className={classes.formControl}
								ref={register({
									required: 'Введіть, будь ласка, назву товару'
								})}
							/>
							{errors.name && <span className={classes.invalidFeedback}>{errors.name.message}</span>}
						</div>
					</Col12>
					<Col6>
						<div className={classes.formGroup}>
							<label htmlFor="price">Ціна товару</label>
							<input
								id="price"
								type="number"
								name="price"
								className={classes.formControl}
								ref={register({
									required: 'Введіть, будь ласка, ціну товару',
									min: {
										value: 0,
										message: 'Товар не може коштувати менше 0 грн.'
									}
								})}
							/>
							{errors.price && <span className={classes.invalidFeedback}>{errors.price.message}</span>}
						</div>
					</Col6>
					<Col6>
						<div className={classes.formGroup}>
							<label htmlFor="amount">Початкова кількість</label>
							<input
								id="amount"
								type="number"
								name="amount"
								className={classes.formControl}
								ref={register({
									required: 'Введіть, будь ласка, кількість товару',
									min: {
										value: 1,
										message: 'Товару не може бути менше одної одиниці'
									}
								})}
							/>
							{errors.amount && <span className={classes.invalidFeedback}>{errors.amount.message}</span>}
						</div>
					</Col6>
					<Col12>
						<div className={classes.formGroup}>
							<label htmlFor="categories">Категорія</label>
							<div className={classes.formControlSelect}>
								<select
									name="categories"
									id="categories"
									className={classes.formControl}
									ref={register({
										required: 'Виберіть, будь ласка, категорію'
									})}
								>
									{categories.map(cat =>
										<option key={cat.id} value={cat.id}>{cat.name}</option>
									)}
								</select>
							</div>
							{errors.categories && <span className={classes.invalidFeedback}>{errors.categories.message}</span>}
						</div>
					</Col12>
					<Col12>
						<Button
							color="primary"
							loading={loading}
							icon={'plus'}
						>Додати</Button>
					</Col12>
				</Row>
			</form>
		</FormLayout>
	)
}

wrapper.getStaticProps(async ({store}) => {
	let categories = []

	await db.collection('categories').get().then(snapshot => {
		snapshot.forEach(cat => categories.push({id: cat.id, ...cat.data()}))
	})

	store.dispatch(setCategories(categories))

	return {props: {}}
})
