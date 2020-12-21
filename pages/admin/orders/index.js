import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import classes from '../../../styles/AdminLayout/components/forms.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PageHeader, {Title, Tools} from '../../../components/AdminLayout/PageHeader';
import TableList, {ListBody} from '../../../components/AdminLayout/TableList';
import {wrapper} from '../../../redux/store';
import {db} from '../../../config/firebaseConfig';
import OrderItem from '../../../components/AdminLayout/TableList/OrderItem';
import {useOrder} from '../../../hooks/useOrder';
import {alertContext} from '../../../context/alert/alertContext';
import {useContext} from 'react';
import Alert from '../../../components/Alert';

export default function Orders({orders}) {
	const pageName = 'Замовлення'
	const orderStatuses = process.env.ORDER_STATUSES

	const listHeader = [
		'#', 'Код замовлення', 'Дата', 'Статус', 'Клієнт', 'Товари', 'До сплати', ''
	]

	const {updateOrder} = useOrder()
	const {showAlert} = useContext(alertContext)

	const changeStatus = (order, status) => {
		order.status = status

		updateOrder(order).then(response => {
			if (response?.error) {
				console.log(response.error)
				showAlert('Щось пішло не так при оновленні статусу...', 'error')
			}
		})
	}

	return (
		<AdminLayout title={pageName}>
			<Alert />
			<PageHeader>
				<Title>Замовлення</Title>
				<Tools>
					<li>
						<form className={classes.formControlWrap}>
							<div className={`${classes.formIcon} ${classes.formIconRight}`}>
								<FontAwesomeIcon icon="search" />
							</div>
							<input
								type="text"
								placeholder="Пошук за кодом"
								name="id"
								className={classes.formControl}
							/>
						</form>
					</li>
				</Tools>
			</PageHeader>
			<TableList listHeader={listHeader}>
				<ListBody>
					{orders.map((order, index) =>
						<OrderItem
							order={order}
							index={index}
							key={order.id}
							actions={{
								viewed: () => changeStatus(order, orderStatuses['viewed']),
								sent: () => changeStatus(order, orderStatuses['sent'])
							}}
						/>
					)}
				</ListBody>
			</TableList>
		</AdminLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
	let orders = []

	await db.collection('orders').orderBy('date', 'desc').get().then(snapshot => {
		snapshot.forEach(order => orders.push({id: order.id, ...order.data()}))
	})

	return {props: {orders}}
})
