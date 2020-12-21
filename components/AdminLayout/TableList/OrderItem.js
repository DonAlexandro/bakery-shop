import {useState} from 'react';
import {ListCol, ListColIcon, TableListItem} from './index';
import DropdownLayout from '../dropdown/DropdownLayout';
import classes from '../../../styles/AdminLayout/goods.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SmallMenu from '../dropdown/SmallMenu';
import LinksListItem from '../dropdown/LinksListItem';
import {pluralize} from '../../../utils/pluraliza';
import {dateFormat} from '../../../utils/dateFormat';
import Badge from '../Badge';

export default function OrderItem({order, index, actions}) {
	const [dropdown, setDropdown] = useState(false)

	const toggleDropdown = value => setDropdown(value)

	const date = dateFormat(order.date)
	const productsCount = order.products.length

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
			<ListCol>{date}</ListCol>
			<ListCol><Badge color={orderStatusColor}>{order.status}</Badge></ListCol>
			<ListCol>{`${order.customer.name} ${order.customer.lastName}`}</ListCol>
			<ListCol accent="colored">
				{productsCount > 1
				? `${productsCount} ${pluralize(order.products.length, ['товар', 'товари', 'товарів'])}`
				: order.products[0].name}
			</ListCol>
			<ListCol accent="medium">{order.sum} грн.</ListCol>
			<ListColIcon>
				<DropdownLayout>
					<button className={[
						classes.btn,
						classes.btnRound,
						classes.btnOutlineLight,
						classes.borderTransparent,
						classes.btnTrigger
					].join(' ')} onClick={() => setDropdown(prev => !prev)}><FontAwesomeIcon icon="ellipsis-h" /></button>
					{dropdown && <SmallMenu right>
						<LinksListItem
							icon="eye"
							toggleDropdown={toggleDropdown}
							action={actions.viewed}
						>Переглянуто</LinksListItem>
						<LinksListItem
							icon="truck"
							toggleDropdown={toggleDropdown}
							action={actions.sent}
						>Відправлено</LinksListItem>
						<LinksListItem
							icon="trash-alt"
							toggleDropdown={toggleDropdown}
							action={() => {}}
						>Видалити замовлення</LinksListItem>
					</SmallMenu>}
				</DropdownLayout>
			</ListColIcon>
		</TableListItem>
	)
}