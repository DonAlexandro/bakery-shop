import {useContext, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AdminLayout from '../../../components/AdminLayout/AdminLayout'
import classes from '../../../styles/AdminLayout/categories.module.scss'
import CategoryForm from '../../../components/AdminLayout/CategoryForm';
import {db} from '../../../config/firebaseConfig';
import TableList from '../../../components/AdminLayout/TableList';
import PageHeader from '../../../components/AdminLayout/PageHeader';
import {useCategory} from '../../../hooks/useCategory';
import {alertContext} from '../../../context/alert/alertContext';
import {wrapper} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setCategories, removeCategory, searchCategory} from '../../../redux/actions';
import {useForm} from 'react-hook-form';

export default function Categories() {
	const [active, setActive] = useState(false)
	const [category, setCategory] = useState(null)
	const [localCategories, setLocalCategories] = useState([])

	const {deleteCategory} = useCategory()
	const {showAlert} = useContext(alertContext)
	const {register, handleSubmit} = useForm()

	const {categories, foundCategories} = useSelector(state => state.categories)
	const dispatch = useDispatch()

	useEffect(() => {
		if (foundCategories.length !== 0) {
			setLocalCategories(foundCategories)
		} else {
			setLocalCategories(categories)
		}
	}, [categories, foundCategories])

	const requestEnd = (message, type, index) => {
		showAlert(message, type)
		showDropdown(index)
	}

	const removeCat = (id, index) => {
		return deleteCategory(id).then(response => {
			if (response?.error) {
				requestEnd(response.error.message, 'error', index)
			} else {
				requestEnd('Категорію успішно видалено!', 'success', index)
				dispatch(removeCategory(id))
			}
		})
	}

	const hideSlide = e => {
		if (e.target.classList.contains('hide-slide')) setActive(false)
	}

	const openSlider = (category, index = null) => {
		setActive(true)
		setCategory(category)

		if (index) showDropdown(index)
	}

	const updateActive = value => {
		setActive(value)
	}

	const showDropdown = index => {
		const dropdown = document.querySelector(`#dropdown-${index}`)
		dropdown.classList.toggle(classes.hide)
	}

	const onSearch = data => {
		dispatch(searchCategory(data.search))
	}

	return (
		<AdminLayout>
			<PageHeader title="Категорії">
				{/*ADDITIONAL HEADER TOOLS*/}
				<li>
					<form className={classes.formControlWrap} onSubmit={handleSubmit(onSearch)}>
						<div className={`${classes.formIcon} ${classes.formIconRight}`}>
							<FontAwesomeIcon icon="search" />
						</div>
						<input
							type="text"
							placeholder="Пошук категорій"
							name="search"
							className={classes.formControl}
							ref={register}
						/>
					</form>
				</li>
				<li>
					<button
						className={`${classes.btn} ${classes.btnPrimary}`}
						onClick={() => openSlider(null)}
					>
						<span className={classes.icon}><FontAwesomeIcon icon="plus"/></span>
						<span className={classes.text}>Додати категорію</span>
					</button>
				</li>
			</PageHeader>
			<TableList>
				{localCategories.map((cat, index) =>
					<li className={classes.tbListItem} key={cat.id || index}>
						<div className={classes.tbCol}>{index + 1}</div>
						<div className={`${classes.tbCol} ${classes.grow1}`}>
							<span className={classes.title}>{cat.name}</span>
						</div>
						<div className={`${classes.tbCol} ${classes.colIcon}`}>
							{/*---DROPDOWN---*/}
							<div className={classes.dropdown}>
								<button className={[
									classes.btn,
									classes.btnRound,
									classes.btnOutlineLight,
									classes.borderTransparent,
									classes.btnTrigger
								].join(' ')} onClick={() => showDropdown(index)}><FontAwesomeIcon icon="ellipsis-h" /></button>
								<div
									className={[
										classes.dropdownMenu,
										classes.dropdownMenuRight,
										classes.dropdownMenuSm,
										classes.shadowLg,
										classes.hide
									].join(' ')}
									id={`dropdown-${index}`}
								>
									<div className={classes.dropdownInner}>
										<ul className={classes.linksList}>
											<li>
												<a onClick={() => openSlider(cat, index)}>
													<span className={classes.icon}><FontAwesomeIcon icon="edit" /></span>
													<span className={classes.text}>Редагувати категорію</span>
												</a>
											</li>
											<li>
												<a onClick={() => removeCat(cat.id, index)}>
													<span className={classes.icon}><FontAwesomeIcon icon="trash-alt" /></span>
													<span className={classes.text}>Видалити категорію</span>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							{/*--------------*/}
						</div>
					</li>
				)}
			</TableList>
			<div
				onClick={hideSlide}
				className={`hide-slide ${classes.toggleSlide} ${active && classes.toggleActive}`}
			>
				<div className={classes.slideWrapper}>
					<CategoryForm updateActive={updateActive} category={category} />
				</div>
			</div>
		</AdminLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(async ({store}) => {
	let categories = []

	await db.collection('categories').get().then(snapshot => {
		snapshot.forEach(cat => categories.push({id: cat.id, ...cat.data()}))
	})

	store.dispatch(setCategories(categories))

	return {props: {}}
})
