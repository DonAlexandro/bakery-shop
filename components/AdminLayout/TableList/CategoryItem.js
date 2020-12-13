import {ListCol, ListColIcon, TableListItem} from './index';
import DropdownLayout from '../dropdown/DropdownLayout';
import classes from '../../../styles/AdminLayout/categories.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SmallMenu from '../dropdown/SmallMenu';
import LinksListItem from '../dropdown/LinksListItem';
import {useState} from 'react';

export default function CategoryItem({category, index}) {
	const [dropdown, setDropdown] = useState(false)

	return (
		<TableListItem>
			<ListCol>{index + 1}</ListCol>
			<ListCol accent="high">{category.name}</ListCol>
			<ListColIcon>
				{/*---DROPDOWN---*/}
				<DropdownLayout>
					<button className={[
						classes.btn,
						classes.btnRound,
						classes.btnOutlineLight,
						classes.borderTransparent,
						classes.btnTrigger
					].join(' ')} onClick={() => setDropdown(prev => !prev)}><FontAwesomeIcon icon="ellipsis-h" /></button>
					<SmallMenu>
						<LinksListItem
							icon={'edit'}
						>Редагувати категорію</LinksListItem>
						<LinksListItem
							icon={'trash-alt'}
						>Видалити категорію</LinksListItem>
					</SmallMenu>
				</DropdownLayout>
				{/*--------------*/}
			</ListColIcon>
		</TableListItem>
	)
}
