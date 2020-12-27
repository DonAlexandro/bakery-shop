import {ListCol, TableListItem} from './index';
import {dateFormat} from '../../../utils/dateFormat';
import Badge from '../Badge';

export default function OrderDashboardItem({order, index}) {
	const date = dateFormat(order.date)

	const orderStatuses = process.env.ORDER_STATUSES
	const orderStatusColor = order.status === orderStatuses['processed']
		? 'warning'
		: order.status === orderStatuses['sent']
			? 'success'
			: 'info'

	return (
		<TableListItem>
			<ListCol>{index + 1}</ListCol>
			<ListCol link={{href: '/admin/orders/[id]', as: `/admin/orders/${order.id}`}}>{order.id}</ListCol>
			<ListCol>{order.customer.name} {order.customer.lastName}</ListCol>
			<ListCol>{date}</ListCol>
			<ListCol accent="medium">{order.sum} грн.</ListCol>
			<ListCol><Badge color={orderStatusColor}>{order.status}</Badge></ListCol>
		</TableListItem>
	)
}