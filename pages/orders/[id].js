import {db} from '../../config/firebaseConfig'
import Page, {Sticker} from '../../components/MainLayout/Page';
import MainLayout from '../../components/MainLayout/MainLayout';
import DetailList, {Item} from '../../components/DetailList';
import {Col6, Row} from '../../components/Grid';
import {dateFormat} from '../../utils/dateFormat';
import Box from '../../components/Box';

export default function Order({order}) {
	const pageName = 'Замовлення'
	const date = dateFormat(order.date)

	return (
		<MainLayout title={pageName}>
			<Page>
				<Sticker>{pageName}</Sticker>
				<Box m="mt5">
					<Row>
						<Col6>
							<DetailList design="main">
								<Item label="Код">{order.id}</Item>
								<Item label="Сума">{order.sum} грн.</Item>
							</DetailList>
						</Col6>
						<Col6>
							<DetailList design="main">
								<Item label="Дата">{date}</Item>
								<Item label="Статус">{order.status}</Item>
							</DetailList>
						</Col6>
					</Row>
				</Box>
				<Box m="mt4">
					<Box m="mb3">
						<h4>Інформація про замовника</h4>
					</Box>
					<Row>
						<Col6>
							<DetailList design="main">
								<Item label="Ім'я">{order.customer.name}</Item>
								<Item label="Прізвище">{order.customer.lastName}</Item>
								<Item label="Ел. адрес">{order.customer.email}</Item>
							</DetailList>
						</Col6>
						<Col6>
							<DetailList design="main">
								<Item label="Адрес доставки">{order.customer.home}</Item>
								<Item label="Відділення нової пошти">{order.customer.post}</Item>
								<Item label="Контактний телефон">{order.customer.phone}</Item>
							</DetailList>
						</Col6>
					</Row>
				</Box>
			</Page>
		</MainLayout>
	)
}

export async function getServerSideProps({query}) {
	let order = null

	await db.collection('orders').doc(query.id).get()
		.then(doc => {
			order = {id: doc.id, ...doc.data()}
		})

	return {props: {order}}
}
