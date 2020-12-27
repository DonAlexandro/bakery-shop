import {ModalFooter, ModalBody} from '../Modal';
import classes from '../../../styles/MainLayout/order.module.scss'
import Button from '../Button';
import {useForm} from 'react-hook-form';
import {Col12, Col6, Row} from '../../Grid';
import {useOrder} from '../../../hooks/useOrder';
import {useContext} from 'react';
import {alertContext} from '../../../context/alert/alertContext';
import {loadingContext} from '../../../context/loading/loadingContext';
import Alert from '../../Alert';
import {useCart} from '../../../hooks/useCart';

export default function OrderItem({products, sum, customer, toggleModal, clearCart}) {
	const {register, handleSubmit, errors} = useForm()
	const {createOrder} = useOrder()
	const {deleteCart} = useCart()
	const {showAlert} = useContext(alertContext)
	const {loading, showLoading, hideLoading} = useContext(loadingContext)

	const requestEnd = (message, type) => {
		showAlert(message, type)
		hideLoading()
		toggleModal(false)
	}

	const onSubmit = data => {
		showLoading()

		const order = {products, customer: {...data, id: customer.id}, date: Date.now(), status: 'В обробці', sum}

		return createOrder(order).then(response => {
			if (response?.error) {
				requestEnd('Щось пішло не так...', 'error')
			} else {
				requestEnd('Ваше замовлення прийнято!', 'success')
				deleteCart(customer.id).then(response => response?.error
					? console.error(response.error)
					: clearCart()
				)
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Alert />
			<ModalBody>
				<section className={classes.orderSection}>
					<h6 className={classes.orderSectionTitle}>Чек</h6>
					<ul className={classes.orderList}>
						{products.map(product => {

							return (
								<li className={classes.orderListItem} key={product.id}>
									<span>{`${product.count} x ${product.name}`}</span>
									<span>{product.count * product.price} грн.</span>
								</li>
							)
						})}
						<li className={classes.orderListSum}>
							<span>Сума</span>
							<span>{sum} грн.</span>
						</li>
						<li className={classes.orderListTotal}>
							<span>Разом до оплати</span>
							<span>{sum} грн.</span>
						</li>
					</ul>
				</section>
				<section className={classes.orderSection}>
					<h6 className={classes.orderSectionTitle}>Дані замовника</h6>
					<Row>
						<Col6>
							<div className={`${classes.formGroup} ${classes.m0}`}>
								<label htmlFor="name">Ваше ім'я</label>
								<input
									type="text"
									name="name"
									id="name"
									defaultValue={customer.name || ''}
									className={classes.formControl}
									ref={register({
										required: `Введіть, будь ласка, ваше ім'я`
									})}
								/>
								<span className={`${classes.textHelper} ${classes.red}`}>
									{errors.name && errors.name.message}
								</span>
							</div>
						</Col6>
						<Col6>
							<div className={`${classes.formGroup} ${classes.m0}`}>
								<label htmlFor="lastName">Ваше прізвище</label>
								<input
									type="text"
									name="lastName"
									id="lastName"
									defaultValue={customer.lastName || ''}
									className={classes.formControl}
									ref={register({
										required: `Введіть, будь ласка, ваше прізвище`
									})}
								/>
								<span className={`${classes.textHelper} ${classes.red}`}>
									{errors.lastName && errors.lastName.message}
								</span>
							</div>
						</Col6>
						<Col6>
							<div className={`${classes.formGroup} ${classes.m0}`}>
								<label htmlFor="email">Контактний E-mail</label>
								<input
									type="text"
									name="email"
									id="email"
									defaultValue={customer.email || ''}
									className={classes.formControl}
									ref={register({
										required: `Введіть, будь ласка, ваш ел. адрес`,
										pattern: {
											value: /.+@.+\..+/,
											message: 'Введіть коректний ел. адрес'
										}
									})}
								/>
								<span className={`${classes.textHelper} ${classes.red}`}>
									{errors.email && errors.email.message}
								</span>
							</div>
						</Col6>
						<Col6>
							<div className={`${classes.formGroup} ${classes.m0}`}>
								<label htmlFor="phone">Контактний Телефон</label>
								<input
									type="number"
									name="phone"
									id="phone"
									className={classes.formControl}
									ref={register({
										required: `Введіть, будь ласка, ваш телефон`,
										minLength: {
											value: 10,
											message: 'Номер телефону не може містити менше 10 символів'
										},
										maxLength: {
											value: 13,
											message: 'Номер телефону не може містити більше 13 символів'
										}
									})}
								/>
								<span className={`${classes.textHelper} ${classes.red}`}>
									{errors.phone && errors.phone.message}
								</span>
							</div>
						</Col6>
						<Col6>
							<div className={`${classes.formGroup} ${classes.m0}`}>
								<label htmlFor="home">Місце проживання</label>
								<input
									type="text"
									name="home"
									id="home"
									className={classes.formControl}
									defaultValue={`${customer.region} обл. ${customer.city}`}
									ref={register({
										required: `Введіть, будь ласка, ваше місце проживання`,
									})}
								/>
								<span className={`${classes.textHelper} ${classes.red}`}>
									{errors.home && errors.home.message}
								</span>
							</div>
						</Col6>
						<Col6>
							<div className={`${classes.formGroup} ${classes.m0}`}>
								<label htmlFor="post">Відділення нової пошти</label>
								<input
									type="text"
									name="post"
									id="post"
									className={classes.formControl}
									ref={register({
										required: `Введіть, будь ласка, відділення нової пошти`,
									})}
								/>
								<span className={`${classes.textHelper} ${classes.red}`}>
									{errors.post && errors.post.message}
								</span>
							</div>
						</Col6>
						<Col12>
							<div className={`${classes.formGroup} ${classes.m0}`}>
								<label htmlFor="comment">Коментар до замовлення</label>
								<textarea
									type="text"
									name="comment"
									id="comment"
									className={classes.formControl}
									ref={register}
								/>
							</div>
						</Col12>
					</Row>
				</section>
			</ModalBody>
			<ModalFooter>
				<Button
					loading={loading}
					actions={{
						onClick: () => {}
					}}
					styles={{block: true}}
				>Підтвердити</Button>
			</ModalFooter>
		</form>
	)
}