import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import button from '../../styles/AdminLayout/components/buttons.module.scss';

export default function Button({children, color, loading = false, icon, clickAct}) {
	const colors = {
		primary: button.btnPrimary
	}

	return (
		<button
			onClick={clickAct}
			className={[
				button.btn,
				colors[color] || button.btnPrimary
			].join(' ')}
			disabled={loading}
		>
			{icon && <span className={button.icon}>{!loading && <FontAwesomeIcon icon={icon} />}</span>}
			<span className={button.text}>{loading ? 'Завантаження...' : children}</span>
		</button>
	)
}
