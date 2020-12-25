import {ListCol, TableListItem} from './index';
import {dateFormat} from '../../../utils/dateFormat';
import {pluralize} from '../../../utils/pluraliza';

export default function UserOrderItem({order, index}) {
	const date = dateFormat(order.date)
	const products = order.products.length > 1
		? `${order.products.length} ${pluralize(order.products.length, ['товар', 'товари', 'товарів'])}`
		: order.products[0].name

	return (
		<TableListItem>
			<ListCol>{index + 1}</ListCol>
			<ListCol
				link={{href: '/admin/orders/[id]', as: `/admin/orders/${order.id}`}}
			>{order.id}</ListCol>
			<ListCol>{date}</ListCol>
			<ListCol accent="colored">{products}</ListCol>
			<ListCol accent="medium">{order.sum} грн.</ListCol>
		</TableListItem>
	)
}