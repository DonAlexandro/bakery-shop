import classes from '../styles/home.module.scss'
import MainLayout from '../components/MainLayout'

export default function Home() {
	return (
		<MainLayout title={'Home'}>
			<div className={classes.row}>
				<div className={classes.col}>
					<div className={classes.fullImg}>
						<img src="/thumb-315x500.jpg" alt="thumb"/>
					</div>
				</div>
				<div className={classes.col}>
					<div className={classes.block}>
						<img src="/thumb-320x240.jpg" alt="thumb" />
					</div>
					<div className={classes.sticker}>
						<h5>Любимо пекти</h5>
					</div>
					<div className={classes.block}>
						<img src="/thumb-320x240.jpg" alt="thumb" />
					</div>
				</div>
				<div className={classes.col}>
					<h3>Зі щирим серцем</h3>
					<p>Независимые государства являются только методом политического участия и объективно рассмотрены соответствующими инстанциями. С другой стороны, курс на социально-ориентированный национальный проект создаёт предпосылки для первоочередных требований.</p>
				</div>
			</div>
		</MainLayout>
	)
}
