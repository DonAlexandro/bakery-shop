import {useState} from 'react';
import {ListCol, ListColIcon, TableListItem} from './index';
import DropdownLayout from '../dropdown/DropdownLayout';
import classes from '../../../styles/AdminLayout/goods.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SmallMenu from '../dropdown/SmallMenu';
import LinksListItem from '../dropdown/LinksListItem';
import {pluralize} from '../../../utils/pluraliza';
import Badge from '../Badge';

export default function OrderItem({order, index}) {
	const [dropdown, setDropdown] = useState(false)

	const toggleDropdown = value => setDropdown(value)

	const date = new Intl.DateTimeFormat('uk-UA', {dateStyle: 'medium'}).format(new Date(order.date))
	const productsCount = order.products.length
	const orderStatusColor = order.status === 'В обробці'
		? 'warning'
		: order.status === 'Відправлено'
			? 'success'
			: 'info'

	return (
		<TableListItem>
			<ListCol>{index + 1}</ListCol>
			<ListCol>{order.id}</ListCol>
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
							action={() => {}}
						>Переглянуто</LinksListItem>
						<LinksListItem
							icon="truck"
							toggleDropdown={toggleDropdown}
							action={() => {}}
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