import dropdown from '../../../styles/AdminLayout/components/dropdown.module.scss';
import shadows from '../../../styles/AdminLayout/components/shadow.module.scss';
import common from '../../../styles/AdminLayout/components/common.module.scss';

export default function SmallMenu({children, menuId}) {
	return (
		<div className={[
			dropdown.dropdownMenu,
			dropdown.dropdownMenuRight,
			dropdown.dropdownMenuSm,
			shadows.shadowLg,
			common.hide
		].join(' ')} id={menuId}>
			<div className={dropdown.dropdownInner}>
				<ul className={dropdown.linksList}>
					{children}
				</ul>
			</div>
		</div>
	)
}
