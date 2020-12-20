import dropdown from '../../../styles/AdminLayout/components/dropdown.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function LinksListItem({icon, children, action, toggleDropdown}) {
	return (
		<li onClick={() => toggleDropdown(false)}>
			<a onClick={action}>
				<span className={dropdown.icon}><FontAwesomeIcon icon={icon} /></span>
				<span className={dropdown.text}>{children}</span>
			</a>
		</li>
	)
}
