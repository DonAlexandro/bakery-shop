import classes from '../../../styles/AdminLayout/components/dropdown.module.scss';

export default function DropdownLayout({children, moreClasses}) {
	return (
		<div className={`${classes.dropdown} ${moreClasses ? moreClasses.join(' ') : ''}`}>
			{children}
		</div>
	)
}
