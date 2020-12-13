import dropdown from '../../../styles/AdminLayout/components/dropdown.module.scss';
import shadows from '../../../styles/AdminLayout/components/shadow.module.scss';

export default function SmallMenu({children, menuId, right}) {
	return (
		<div className={[
			dropdown.dropdownMenu,
			right ? dropdown.dropdownMenuRight : dropdown.dropdownMenuRight,
			dropdown.dropdownMenuSm,
			shadows.shadowLg
		].join(' ')} id={menuId}>
			<div className={dropdown.dropdownInner}>
				<ul className={dropdown.linksList}>
					{children}
				</ul>
			</div>
		</div>
	)
}
