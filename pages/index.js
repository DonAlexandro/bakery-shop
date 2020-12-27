import classes from '../styles/MainLayout/home.module.scss'
import MainLayout from '../components/MainLayout/MainLayout'
import {db} from '../config/firebaseConfig';

export default function Home({settings}) {
	return (
		<MainLayout
			title={'Головна'}
			keywords={['головна', 'головна сторінка', 'home', 'home page']}
			description={'Головна сторінка сайту міської пекарні'}
		>
			<div className={classes.row}>
				<div className={classes.col3}>
					<div className={classes.fullImg}>
						<img src="/bakery.jpg" alt="thumb"/>
					</div>
				</div>
				<div className={classes.col3}>
					<div className={classes.block}>
						<img src="/cookies.jpg" alt="thumb" />
					</div>
					<div className={classes.sticker}>
						<h5>{settings.sticker}</h5>
					</div>
					<div className={classes.block}>
						<img src="/bread.jpg" alt="thumb" />
					</div>
				</div>
				<div className={classes.col3}>
					<h3>Зі щирим серцем</h3>
					<p>Независимые государства являются только методом политического участия и объективно рассмотрены соответствующими инстанциями. С другой стороны, курс на социально-ориентированный национальный проект создаёт предпосылки для первоочередных требований.</p>
				</div>
			</div>
		</MainLayout>
	)
}

export async function getServerSideProps() {
	let settings = null

	await db.collection('settings').doc(process.env.SETTINGS_ID).get().then(doc => {
		settings = doc.data()
	})

	return {props: {settings}}
}
