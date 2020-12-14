import {ListCol, ListColIcon, TableListItem} from './index';
import DropdownLayout from '../dropdown/DropdownLayout';
import classes from '../../../styles/AdminLayout/goods.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SmallMenu from '../dropdown/SmallMenu';
import LinksListItem from '../dropdown/LinksListItem';
import {useState} from 'react';

export default function ProductItem({product, index, categories, actions}) {
	const [dropdown, setDropdown] = useState(false)

	const toggleDropdown = value => setDropdown(value)

	return (
		<TableListItem>
			<ListCol>{index + 1}</ListCol>
			<ListCol accent="high">{product.name}</ListCol>
			<ListCol>{product.id}</ListCol>
			<ListCol accent="medium">{product.price} грн.</ListCol>
			<ListCol>{product.amount}</ListCol>
			<ListCol>{categories.filter(cat => cat.id === product.category)[0].name}</ListCol>
			<ListColIcon>
				<DropdownLayout>
					<button className={[
						classes.btn,
						classes.btnRound,
						classes.btnOutlineLight,
						classes.borderTransparent,
					].join(' ')} onClick={() => setDropdown(prev => !prev)}><FontAwesomeIcon icon="ellipsis-h" /></button>
					{dropdown && <SmallMenu right>
						<LinksListItem
							icon={'image'}
							toggleDropdown={toggleDropdown}
							action={actions.image}
						>Оновити зображення</LinksListItem>
						<LinksListItem
							icon={'edit'}
							toggleDropdown={toggleDropdown}
							action={actions.edit}
						>Редагувати товар</LinksListItem>
						<LinksListItem
							icon={'trash-alt'}
							toggleDropdown={toggleDropdown}
							action={actions.delete}
						>Видалити товар</LinksListItem>
					</SmallMenu>}
				</DropdownLayout>
			</ListColIcon>
		</TableListItem>
	)
}