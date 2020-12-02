import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AdminLayout from '../../../components/AdminLayout/AdminLayout'
import classes from '../../../styles/AdminLayout/categories.module.scss'

export default function Categories() {
	return (
		<AdminLayout>
			<div className={classes.pageHeader}>
				<div className={classes.pageHeaderContent}>
					<h3>Категорії</h3>
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
									placeholder="Пошук категорій"
									className={classes.formControl}
								/>
							</div>
						</li>
						<li>
							<Link href={'/admin/goods/create'}>
								<a className={`${classes.btn} ${classes.btnPrimary}`}>
									<span className={classes.icon}><FontAwesomeIcon icon="plus"/></span>
									<span className={classes.text}>Додати категорію</span>
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<ul className={classes.tbList}>
				<li className={classes.tbListHead}>
					<div className={`${classes.tbCol}`}>#</div>
					<div className={`${classes.tbCol} ${classes.grow1}`}>Назва категорії</div>
				</li>
				<li className={`${classes.tbListItem} ${classes.hoverable}`}>
					<div className={`${classes.tbCol}`}>1</div>
					<div className={`${classes.tbCol} ${classes.grow1}`}><span className={classes.title}>Хліб</span></div>
					<div className={`${classes.tbCol} ${classes.colIcon}`}>
						<div className={classes.dropdown}>
							<button className={[
								classes.btn,
								classes.btnRound,
								classes.btnOutlineLight,
								classes.borderTransparent,
								classes.btnTrigger
							].join(' ')}><FontAwesomeIcon icon="ellipsis-h" /></button>
							<div className={[
								classes.dropdownMenu,
								classes.dropdownMenuRight,
								classes.dropdownMenuSm,
								classes.shadowLg,
								classes.hide
							].join(' ')}>
								<div className={classes.dropdownInner}>
									<ul className={classes.linksList}>
										<li>
											<Link href={'/admin/categories/view/[id]'}>
												<a>
													<span className={classes.icon}><FontAwesomeIcon icon="eye" /></span>
													<span className={classes.text}>Переглянути категорію</span>
												</a>
											</Link>
										</li>
										<li>
											<Link href={'/admin/categories/edit/[id]'}>
												<a>
													<span className={classes.icon}><FontAwesomeIcon icon="edit" /></span>
													<span className={classes.text}>Редагувати категорію</span>
												</a>
											</Link>
										</li>
										<li>
											<Link href={'/admin/categories/delete/[id]'}>
												<a>
													<span className={classes.icon}><FontAwesomeIcon icon="trash-alt" /></span>
													<span className={classes.text}>Видалити категорію</span>
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li className={`${classes.tbListItem} ${classes.hoverable}`}>
					<div className={`${classes.tbCol}`}>1</div>
					<div className={`${classes.tbCol} ${classes.grow1}`}><span className={classes.title}>Хліб</span></div>
					<div className={`${classes.tbCol} ${classes.colIcon}`}>
						<div className={classes.dropdown}>
							<button className={[
								classes.btn,
								classes.btnRound,
								classes.btnOutlineLight,
								classes.borderTransparent,
								classes.btnTrigger
							].join(' ')}><FontAwesomeIcon icon="ellipsis-h" /></button>
							<div className={[
								classes.dropdownMenu,
								classes.dropdownMenuRight,
								classes.dropdownMenuSm,
								classes.shadowLg,
								classes.hide
							].join(' ')}>
								<div className={classes.dropdownInner}>
									<ul className={classes.linksList}>
										<li>
											<Link href={'/admin/categories/view/[id]'}>
												<a>
													<span className={classes.icon}><FontAwesomeIcon icon="eye" /></span>
													<span className={classes.text}>Переглянути категорію</span>
												</a>
											</Link>
										</li>
										<li>
											<Link href={'/admin/categories/edit/[id]'}>
												<a>
													<span className={classes.icon}><FontAwesomeIcon icon="edit" /></span>
													<span className={classes.text}>Редагувати категорію</span>
												</a>
											</Link>
										</li>
										<li>
											<Link href={'/admin/categories/delete/[id]'}>
												<a>
													<span className={classes.icon}><FontAwesomeIcon icon="trash-alt" /></span>
													<span className={classes.text}>Видалити категорію</span>
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</AdminLayout>
	)
}