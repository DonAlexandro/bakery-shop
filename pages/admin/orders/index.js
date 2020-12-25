import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import PageHeader, {Title, Tools} from '../../../components/AdminLayout/PageHeader';
import TableList, {ListBody} from '../../../components/AdminLayout/TableList';
import {wrapper} from '../../../redux/store';
import {db} from '../../../config/firebaseConfig';
import OrderItem from '../../../components/AdminLayout/TableList/OrderItem';
import {useOrder} from '../../../hooks/useOrder';
import {alertContext} from '../../../context/alert/alertContext';
import {useContext, useState} from 'react';
import Alert from '../../../components/Alert';
import Input from '../../../components/AdminLayout/forms/components/Input';
import {useForm} from 'react-hook-form';

export default function Orders({orders: serverOrders}) {
	// Plane variables
	const pageName = 'Замовлення'
	const orderStatuses = process.env.ORDER_STATUSES

	const listHeader = [
		'#', 'Код замовлення', 'Дата', 'Статус', 'Клієнт', 'Товари', 'До сплати', ''
	]

	// Local States
	const [orders, setOrders] = useState(serverOrders)

	// Hooks
	const {updateOrder, deleteOrder} = useOrder()
	const {showAlert} = useContext(alertContext)
	const {register, handleSubmit} = useForm()

	// Functions
	const requestEnd = (message, type) => {
		console.error(message)
		showAlert('Щось пішло не так при оновленні статусу...', 'error')
	}

	const changeStatus = (order, status) => {
		order.status = status

		updateOrder(order).then(response => {
			if (response?.error) {
				requestEnd(response.error.message, 'error')
			}
		})
	}

	const removeOrder = id => {
		if (confirm('Після видалення, відновити це замовлення буде не можливо. Продовжити?')) {
			return deleteOrder(id).then(response => {
				if (response?.error) {
					requestEnd(response.error.message, 'error')
				} else {
					showAlert('Замовлення успішно видалено!', 'success')
					setOrders(prev => prev.filter(order => order.id !== id))
				}
			})
		}
	}

	const onSearch = ({id}) => {
		id === '' ? setOrders(serverOrders) : setOrders(orders.filter(order => order.id.toLowerCase().includes(id.toLowerCase())))
	}

	return (
		<AdminLayout title={pageName}>
			<Alert />
			<PageHeader>
				<Title>Замовлення</Title>
				<Tools>
					<li>
						<form onSubmit={handleSubmit(onSearch)}>
							<Input
								type="text"
								placeholder="Пошук за кодом"
								name="id"
								icon="search"
								onRef={register}
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
								sent: () => changeStatus(order, orderStatuses['sent']),
								delete: () => removeOrder(order.id)
							}}
						/>
					)}
				</ListBody>
			</TableList>
		</AdminLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(async () => {
	let orders = []

	await db.collection('orders').orderBy('date', 'desc').get().then(snapshot => {
		snapshot.forEach(order => orders.push({id: order.id, ...order.data()}))
	})

	return {props: {orders}}
})
