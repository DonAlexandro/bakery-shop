import {useContext, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AdminLayout from '../../../components/AdminLayout/AdminLayout'
import classes from '../../../styles/AdminLayout/categories.module.scss'
import common from '../../../styles/AdminLayout/components/common.module.scss'
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
import Alert from '../../../components/Alert';
import DropdownLayout from '../../../components/AdminLayout/dropdown/DropdownLayout';
import SmallMenu from '../../../components/AdminLayout/dropdown/SmallMenu';
import LinksListItem from '../../../components/AdminLayout/dropdown/LinksListItem';

export default function Categories() {
	const [active, setActive] = useState(false)
	const [category, setCategory] = useState(null)
	const [fetchedCategories, setFetchedCategories] = useState([])

	const {deleteCategory} = useCategory()
	const {showAlert} = useContext(alertContext)
	const {register, handleSubmit} = useForm()

	const {categories, foundCategories} = useSelector(state => state.categories)
	const dispatch = useDispatch()

	useEffect(() => {
		// Якщо користувач починає шукати
		if (foundCategories.length !== 0) {
			setFetchedCategories(foundCategories)
		} else {
			setFetchedCategories(categories)
		}
	}, [categories, foundCategories])

	const requestEnd = (message, type, index) => {
		showAlert(message, type)
		toggleDropdown(index)
	}

	const removeCat = (id, index) => {
		if (confirm('Відновити цю категорію буде не можливо. Продовжити?')) {
			return deleteCategory(id).then(response => {
				if (response?.error) {
					requestEnd(response.error.message, 'error', index)
				} else {
					requestEnd('Категорію було видалено', 'warning', index)
					dispatch(removeCategory(id))
				}
			})
		}

		return
	}

	const hideSlide = e => e.target.classList.contains('hide-slide') && setActive(false)

	const openSlider = (category, index = null) => {
		setActive(true)
		setCategory(category)

		if (index) toggleDropdown(index)
	}

	const updateActive = value => setActive(value)

	const toggleDropdown = index => {
		const dropdown = document.querySelector(`#dropdown-${index}`)
		dropdown.classList.toggle(common.hide)
	}

	const onSearch = data => dispatch(searchCategory(data.search))

	return (
		<AdminLayout title={'Категорії'}>
			<Alert />
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
				{fetchedCategories.map((cat, index) =>
					<li className={classes.tbListItem} key={cat.id}>
						<div className={classes.tbCol}>{index + 1}</div>
						<div className={`${classes.tbCol} ${classes.grow1}`}>
							<span className={classes.title}>{cat.name}</span>
						</div>
						<div className={`${classes.tbCol} ${classes.colIcon}`}>
							{/*---DROPDOWN---*/}
							<DropdownLayout>
								<button className={[
									classes.btn,
									classes.btnRound,
									classes.btnOutlineLight,
									classes.borderTransparent,
									classes.btnTrigger
								].join(' ')} onClick={() => toggleDropdown(index)}><FontAwesomeIcon icon="ellipsis-h" /></button>
								<SmallMenu menuId={`dropdown-${index}`}>
									<LinksListItem
										action={() => openSlider(cat, index)}
										icon={'edit'}
									>Редагувати категорію</LinksListItem>
									<LinksListItem
										action={() => removeCat(cat.id, index)}
										icon={'trash-alt'}
									>Видалити категорію</LinksListItem>
								</SmallMenu>
							</DropdownLayout>
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
