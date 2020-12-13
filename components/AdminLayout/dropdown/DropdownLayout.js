import classes from '../../../styles/AdminLayout/components/dropdown.module.scss';

export default function DropdownLayout({children, moreClasses}) {
	return (
		<div className={`${classes.dropdown} ${moreClasses ? moreClasses.join(' ') : ''}`}>
			{children}
		</div>
	)
}

export function toggleDropdown({index}) {
	const dropdown = document.querySelector(`#dropdown-${index}`)
	dropdown.classList.toggle(classes.hide)
}
