import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import {db} from '../../../config/firebaseConfig'
import {useEffect, useState} from 'react';
import PageHeader, {Title, Tools} from '../../../components/AdminLayout/PageHeader';
import {useRouter} from 'next/router';
import Button from '../../../components/AdminLayout/Button';
import Card from '../../../components/AdminLayout/Card';
import DetailList, {Item} from '../../../components/AdminLayout/DetailList';
import {Col6, Row} from '../../../components/Grid';
import {dateFormat} from '../../../utils/dateFormat';
import TableList, {ListBody} from '../../../components/AdminLayout/TableList';
import OrderProductItem from '../../../components/AdminLayout/TableList/OrderProductItem';
import Box from '../../../components/AdminLayout/Box';
import Jumbotron from '../../../components/AdminLayout/Jumbotron';

export default function OrderDetails({order: serverOrder}) {
	const pageName = 'Замовлення'
	const date = dateFormat(serverOrder.date)

	const [order, setOrder] = useState(serverOrder)
	const router = useRouter()

	useEffect(() => {
		async function load() {
			await db.collection('orders').doc(router.id).get().then(doc => {
				setOrder({id: doc.id, ...doc.data()})
			})
		}

		if (!serverOrder) {
			load()
		}
	}, [])


	if (!order) {
		return (
			<AdminLayout title={pageName}>
				<p>Завантаження...</p>
			</AdminLayout>
		)
	}

	const listHeader = ['#', 'Назва товару', 'Ціна товару', 'Кількість']

	return (
		<AdminLayout title={pageName}>
			<PageHeader>
				<Title small={order.id}>Замовлення</Title>
				<Tools>
					<li>
						<Button
							tag="a"
							link={{href: '/admin/orders'}}
							icon="arrow-left"
							color="outlineLight"
							background="white"
						>Назад</Button>
					</li>
				</Tools>
			</PageHeader>
			<Card>
				<PageHeader>
					<Title
						tag="h5"
						subtitle="Вся інформація, яка використовується для його	 оформлення"
					>Інформація про замовлення</Title>
				</PageHeader>
				<Row>
					<Col6>
						<DetailList>
							<Item label="Код">{order.id}</Item>
							<Item label="Сума">{order.sum} грн.</Item>
						</DetailList>
					</Col6>
					<Col6>
						<DetailList>
							<Item label="Дата">{date}</Item>
							<Item label="Статус">{order.status}</Item>
						</DetailList>
					</Col6>
				</Row>
				<PageHeader>
					<Title tag="h6">Інформація про клієнта</Title>
				</PageHeader>
				<Row>
					<Col6>
						<DetailList>
							<Item label="Ім'я">{order.customer.name}</Item>
							<Item label="Прізвище">{order.customer.lastName}</Item>
							<Item label="Ел. пошта">{order.customer.email}</Item>
						</DetailList>
					</Col6>
					<Col6>
						<DetailList>
							<Item label="Адрес">{order.customer.home}</Item>
							<Item label="Відділення нової пошти">{order.customer.post}</Item>
							<Item label="Номер телефону">{order.customer.phone}</Item>
						</DetailList>
					</Col6>
				</Row>
				<PageHeader>
					<Title tag="h6">Замовляємі товари</Title>
				</PageHeader>
				<Box m="mb4">
					<TableList listHeader={listHeader}>
						<ListBody>
							{order.products.map((product, index) =>
								<OrderProductItem product={product} index={index}/>
							)}
						</ListBody>
					</TableList>
				</Box>
				{order.customer.comment && <><PageHeader>
					<Title tag="h6">Коментар до замовлення</Title>
				</PageHeader>
				<Jumbotron><p>{order.customer.comment}</p></Jumbotron></>}
			</Card>
		</AdminLayout>
	)
}

export async function getServerSideProps({query, req}) {
	let order = null

	if (!req) {
		return {order}
	}

	await db.collection('orders').doc(query.id).get().then(doc => {
		order = {id: doc.id, ...doc.data()}
	})

	return {props: {order}}
}
