import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {wrapper} from '../../../redux/store';
import {db} from '../../../config/firebaseConfig';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import PageHeader, {Title, Tools} from '../../../components/AdminLayout/PageHeader';
import {pluralize} from '../../../utils/pluraliza';
import Input from '../../../components/AdminLayout/forms/components/Input';
import TableList, {ListBody} from '../../../components/AdminLayout/TableList';
import UserItem from '../../../components/AdminLayout/TableList/UserItem';

export default function Users({users: serverUsers, orders}) {

	// Plane variables
	const pageName = 'Користувачі'
	const totalUsers = `${serverUsers.length} ${pluralize(serverUsers.length, ['користувач', 'користувача', 'користувачів'])}`

	const listHeader = [
		'#',
		'Користувач',
		'Замовлено на',
		'Місце проживання',
		'Останнє замовлення',
		'Адміністратор',
	]

	const [users, setUsers] = useState(serverUsers)

	// Hooks
	const {register, handleSubmit} = useForm()

	// Methods
	const onSearch = ({search}) => {
		search === '' ? setUsers(serverUsers) : setUsers(users.filter(user => `${user.name}${user.lastName}`.toLowerCase().includes(search.toLowerCase())))
	}

	return (
		<AdminLayout title={pageName}>
			<PageHeader>
				<Title subtitle={`У вашій системі ${totalUsers}`}>{pageName}</Title>
				<Tools>
					<li>
						<form onSubmit={handleSubmit(onSearch)}>
							<Input
								type="text"
								name="search"
								icon="search"
								placeholder="Пошук за іменем"
								onRef={register}
							></Input>
						</form>
					</li>
				</Tools>
			</PageHeader>
			<TableList listHeader={listHeader}>
				<ListBody>
					{users.map((user, index) => {
						const completeUser = {
							...user,
							orders: orders.filter(order => order.customer.id === user.id)
						}

						return <UserItem key={user.id} user={completeUser} index={index}/>
					})}
				</ListBody>
			</TableList>
		</AdminLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(async () => {
	let users = []
	let orders = []

	await db.collection('users').get().then(snapshot => {
		snapshot.forEach(user => users.push({id: user.id, ...user.data()}))
	})

	await db.collection('orders').get().then(snapshot => {
		snapshot.forEach(order => orders.push({id: order.id, ...order.data()}))
	})

	return {props: {users, orders}}
})
