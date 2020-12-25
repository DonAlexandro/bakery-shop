import {db} from '../../config/firebaseConfig'
import Page, {Sticker} from '../../components/MainLayout/Page';
import MainLayout from '../../components/MainLayout/MainLayout';

export default function Order({order}) {
	return (
		<MainLayout>
			<Page>
				<Sticker>Замовлення</Sticker>
			</Page>
		</MainLayout>
	)
}

export async function getServerSideProps({query}) {
	let order = null

	await db.collection('orders').doc(query.id).get()
		.then(doc => {
			order = {id: doc.id, ...doc.data()}
		})

	return {props: {order}}
}
