import MainLayout from '../../components/MainLayout/MainLayout'
import classes from '../../styles/MainLayout/about.module.scss'
import Image from 'next/image';
import {db} from '../../config/firebaseConfig';

export default function About({settings}) {
	return (
		<MainLayout
			title={'Про нас'}
			keywords={['about us', 'про нас', 'about bakery', 'про пекарню']}
			description={'Невелика розповідь про нашу пекарню'}
		>
			<div className={classes.page}>
				<div className={classes.sticker}>
					<h5>Про нас</h5>
				</div>
				<div className={classes.imgWrapper}>
					<Image
						src="/about.jpg"
						alt="About us"
						height={800}
						width={1000}
					/>
				</div>
				<p>{settings.about}</p>
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
