import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import classes from '../../../styles/AdminLayout/components/forms.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PageHeader from '../../../components/AdminLayout/PageHeader';
import TableList, {ListBody} from '../../../components/AdminLayout/TableList';
import {wrapper} from '../../../redux/store';
import {db} from '../../../config/firebaseConfig';
import {setCategories, setProducts} from '../../../redux/actions';
import OrderItem from '../../../components/AdminLayout/TableList/OrderItem';

export default function Orders({orders}) {
	const pageName = 'Замовлення'

	const listHeader = [
		'#', 'Код замовлення', 'Дата', 'Статус', 'Клієнт', 'Товари', 'До сплати', ''
	]

	return (
		<AdminLayout title={pageName}>
			<PageHeader title={pageName}>
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
			</PageHeader>
			<TableList listHeader={listHeader}>
				<ListBody>
					{orders.map((order, index) =>
						<OrderItem
							order={order}
							index={index}
							key={order.id}
						/>
					)}
				</ListBody>
			</TableList>
		</AdminLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
	let orders = []

	await db.collection('orders').get().then(snapshot => {
		snapshot.forEach(order => orders.push({id: order.id, ...order.data()}))
	})

	return {props: {orders}}
})
