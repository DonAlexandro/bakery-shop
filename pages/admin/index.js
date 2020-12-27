import AdminLayout from '../../components/AdminLayout/AdminLayout';
import PageHeader, {Title} from '../../components/AdminLayout/PageHeader';
import {Col12, Col6, Row} from '../../components/Grid';
import Card, {Amount} from '../../components/AdminLayout/Card';
import {db} from '../../config/firebaseConfig';
import MyChart from '../../components/AdminLayout/MyChart';
import TableList, {ListBody} from '../../components/AdminLayout/TableList';
import {useState} from 'react';
import OrderDashboardItem from '../../components/AdminLayout/TableList/OrderDashboardItem';
import ListIcon, {Item} from '../../components/AdminLayout/ListIcon';

export default function Dashboard({orders, users, products, categories}) {
	const pageName = 'Приборна панель'
	const orderStatuses = process.env.ORDER_STATUSES

	const chartLabels = [
		orderStatuses['sent'],
		orderStatuses['processed'],
		orderStatuses['viewed']
	]

	const chartData = [
		orders.filter(order => order.status === orderStatuses['sent']).length,
		orders.filter(order => order.status === orderStatuses['processed']).length,
		orders.filter(order => order.status === orderStatuses['viewed']).length
	]

	const listHeader = [
		'#',
		'Код замовлення',
		'Клієнт',
		'Дата',
		'Сума',
		'Статус'
	]

	const [recentOrders, setRecentOrders] = useState(orders.slice(0, 5))

	const getSum = () => {
		let sum = 0

		orders.forEach(order => sum += order.sum)

		return sum
	}

	const getAverage = () => {
		let average = 0

		orders.forEach(order => average += order.sum)

		return average !== 0 ? (average / orders.length).toFixed(2) : average
	}

	return (
		<AdminLayout title={pageName}>
			<PageHeader>
				<Title>{pageName}</Title>
			</PageHeader>
			<Row>
				<Col6>
					<Card dark>
						<PageHeader>
							<Title
								tag="h6"
								styles={{
									color: 'white'
								}}
							>Загалом продано на</Title>
						</PageHeader>
						<Amount>{getSum()} грн.</Amount>
					</Card>
				</Col6>
				<Col6>
					<Card>
						<PageHeader>
							<Title
								tag="h6"
							>Середня сума замовлень</Title>
						</PageHeader>
						<Amount>{getAverage()} грн.</Amount>
					</Card>
				</Col6>
			</Row>
			<Row>
				<Col6>
					<Card>
						<PageHeader>
							<Title
								tag="h6"
							>Статистика замовлень</Title>
						</PageHeader>
						<MyChart
							labels={chartLabels}
							data={chartData}
						/>
					</Card>
				</Col6>
				<Col6>
					<Card>
						<PageHeader>
							<Title
								tag="h6"
							>Статистика магазину</Title>
						</PageHeader>
						<ListIcon>
							<Item label="Кількість замовлень" icon="shopping-bag">{orders.length}</Item>
							<Item label="Кількість користувачів" icon="users" color="info">{users.length}</Item>
							<Item label="Кількість товарів" icon="boxes" color="pink">{products.length}</Item>
							<Item label="Кількість категорій" icon="list">{categories.length}</Item>
						</ListIcon>
					</Card>
				</Col6>
				<Col12>
					<Card>
						<PageHeader>
							<Title
								tag="h6"
							>Останні замовлення</Title>
						</PageHeader>
						<TableList
							type="bordered"
							listHeader={listHeader}
						>
							<ListBody>
								{recentOrders.map((order, index) =>
									<OrderDashboardItem
										key={order.id}
										order={order}
										index={index}
									/>
								)}
							</ListBody>
						</TableList>
					</Card>
				</Col12>
			</Row>
		</AdminLayout>
	)
}

export async function getServerSideProps() {
	let orders = []
	let users = []
	let products = []
	let categories = []

	await db.collection('orders').orderBy('date', 'desc').get().then(snapshot => {
		snapshot.forEach(order => orders.push({id: order.id, ...order.data()}))
	})

	await db.collection('users').get().then(snapshot => {
		snapshot.forEach(user => users.push({id: user.id, ...user.data()}))
	})

	await db.collection('products').get().then(snapshot => {
		snapshot.forEach(product => products.push({id: product.id, ...product.data()}))
	})

	await db.collection('categories').get().then(snapshot => {
		snapshot.forEach(category => categories.push({id: category.id, ...category.data()}))
	})

	return {props: {orders, users, products, categories}}
}
