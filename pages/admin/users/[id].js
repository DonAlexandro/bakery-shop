import {db} from '../../../config/firebaseConfig';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import PageHeader, {Title, Tools} from '../../../components/AdminLayout/PageHeader';
import Button from '../../../components/AdminLayout/Button';
import Card from '../../../components/AdminLayout/Card';
import {Col6, Row} from '../../../components/Grid';
import DetailList, {Item} from '../../../components/AdminLayout/DetailList';
import {dateFormat} from '../../../utils/dateFormat';
import TableList, {ListBody} from '../../../components/AdminLayout/TableList';
import UserOrderItem from '../../../components/AdminLayout/TableList/UserOrderItem';

export default function UserDetails({user, orders}) {
	const pageName = 'Користувач'
	const date = dateFormat(user.date)

	const listHeader = [
		'#',
		'Код замовлення',
		'Дата',
		'Товари',
		'До сплати'
	]

	return (
		<AdminLayout title={pageName}>
			<PageHeader>
				<Title small={`${user.name} ${user.lastName}`}>{pageName}</Title>
				<Tools>
					<Button
						icon="arrow-left"
						styles={{
							background: 'white',
							color: 'outlineLight'
						}}
					>Назад</Button>
				</Tools>
			</PageHeader>
			<Card>
				<PageHeader>
					<Title
						tag="h5"
						subtitle="Вся інформація про користувача, накшлалт імені чи адреси"
					>Інформація про користувача</Title>
				</PageHeader>
				<Row>
					<Col6>
						<DetailList>
							<Item label="Ім'я">{user.name}</Item>
							<Item label="Прізвище">{user.lastName}</Item>
						</DetailList>
					</Col6>
					<Col6>
						<DetailList>
							<Item label="Ел. адрес">{user.email}</Item>
							<Item label="Адреса">{`${user.region} обл., ${user.city}`}</Item>
						</DetailList>
					</Col6>
				</Row>
				<PageHeader>
					<Title tag="h6">Додаткова інформація</Title>
				</PageHeader>
				<Row>
					<Col6>
						<DetailList>
							<Item label="Дата приєднання">{date}</Item>
							<Item label="Ідентифікатор">{user.id}</Item>
							<Item label="Аміністратор">{user.isAdmin ? 'Так' : 'Ні'}</Item>
						</DetailList>
					</Col6>
				</Row>
				<PageHeader>
					<Title tag="h6">Замовлення користувача</Title>
				</PageHeader>
				<TableList
					listHeader={listHeader}
					type="bordered"
				>
					<ListBody>
						{orders.filter(order => order.customer.id === user.id).map((order, index) =>
							<UserOrderItem
								key={order.id}
								order={order}
								index={index}
							/>
						)}
					</ListBody>
				</TableList>
			</Card>
		</AdminLayout>
	)
}

export async function getServerSideProps({query}) {
	let user = null
	let orders = []

	await db.collection('users').doc(query.id).get().then(doc => {
		user = doc.data()
	})

	await db.collection('orders').orderBy('date', 'desc').get().then(snapshot => {
		snapshot.forEach(order => orders.push({id: order.id, ...order.data()}))
	})

	return {props: {user, orders}}
}
