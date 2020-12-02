import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import classes from '../../../styles/AdminLayout/goods.module.scss'

export default function Goods() {
	return (
		<AdminLayout>
			<div className={classes.pageHeader}>
				<div className={classes.pageHeaderContent}>
					<h3>Товари</h3>
				</div>
				<div className={classes.pageHeaderContent}>
					<ul className={classes.blockTools}>
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
							<Link href={'/admin/goods/create'}>
								<a className={`${classes.btn} ${classes.btnPrimary}`}>
									<span className={classes.icon}><FontAwesomeIcon icon="plus"/></span>
									<span className={classes.text}>Додати товар</span>
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</AdminLayout>
	)
}
