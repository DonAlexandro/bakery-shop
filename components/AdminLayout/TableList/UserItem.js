import {useState} from 'react';
import {ListCol, ListColIcon, TableListItem} from './index';
import Badge from '../Badge';
import DropdownLayout from '../dropdown/DropdownLayout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SmallMenu from '../dropdown/SmallMenu';
import LinksListItem from '../dropdown/LinksListItem';
import {dateFormat} from '../../../utils/dateFormat';
import Button from '../Button';

export default function UserItem({user, index, actions}) {
	const date = user.orders.length !== 0
		? dateFormat(user.orders[user.orders.length - 1].date)
		: 'Користувач ще нічого не замовляв'

	const [dropdown, setDropdown] = useState(false)

	const toggleDropdown = value => setDropdown(value)

	const countSum = () => {
		let sum = 0

		user.orders.forEach(order => {
			sum += order.sum
		})

		return sum
	}

	return (
		<TableListItem>
			<ListCol>{index + 1}</ListCol>
			<ListCol user={user}></ListCol>
			<ListCol accent="medium">{`${countSum()} грн.`}</ListCol>
			<ListCol>{`${user.region} обл., ${user.city}`}</ListCol>
			<ListCol>{date}</ListCol>
			<ListCol><Badge color={user.isAdmin ? 'success' : 'warning'}>{user.isAdmin ? 'Так' : 'Ні'}</Badge></ListCol>
		</TableListItem>
	)
}
