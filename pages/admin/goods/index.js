import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import classes from '../../../styles/AdminLayout/goods.module.scss'
import PageHeader from '../../../components/AdminLayout/PageHeader';
import TableList from '../../../components/AdminLayout/TableList';
import RightSidebar from '../../../components/AdminLayout/RightSidebar';
import ProductForm from '../../../components/AdminLayout/forms/ProductForm';
import Button from '../../../components/AdminLayout/Button';

export default function Goods() {
	const pageName = 'Товари'

	const [sidebar, setSidebar] = useState(false)

	const toggleSidebar = value => setSidebar(value)

	const listHeader = [
		{text: '#', grow: false},
		{text: 'Назва товару', grow: true},
		{text: 'Код товару', grow: false},
		{text: 'Ціна товару', grow: false},
		{text: 'Кількість на складі', grow: false},
		{text: 'Категорія', grow: true},
	]

	return (
		<AdminLayout title={pageName}>
			<PageHeader title={pageName}>
				<li>
					<div className={classes.formControlWrap}>
						<div className={`${classes.formIcon} ${classes.formIconRight}`}>
							<FontAwesomeIcon icon="search" />
						</div>
						<input
							type="text"
							placeholder="Пошук товару за кодом"
							className={classes.formControl}
						/>
					</div>
				</li>
				<li>
					<Button
						color="primary"
						icon={'plus'}
						clickAct={() => toggleSidebar(true)}
					>Додати товар</Button>
				</li>
			</PageHeader>
			<TableList listHeader={listHeader}>

			</TableList>
			<RightSidebar options={{
				active: sidebar,
				toggleSidebar
			}}>
				<ProductForm></ProductForm>
			</RightSidebar>
		</AdminLayout>
	)
}
