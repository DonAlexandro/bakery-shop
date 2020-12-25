import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import button from '../../styles/AdminLayout/components/buttons.module.scss';
import common from '../../styles/AdminLayout/components/common.module.scss';
import Link from 'next/link';

export default function Button({children, styles = {}, tag = 'button', link, loading = false, icon, actions}) {
	const colors = {
		primary: button.btnPrimary,
		outlineLight: button.btnOutlineLight
	}

	const backgrounds = {
		white: button.bgWhite
	}

	const sizes = {
		sm: button.btnSm
	}

	const attrs = {
		onClick: actions?.onClick,
		className: [
			button.btn,
			colors[styles.color] || button.btnPrimary,
			styles.background && backgrounds[styles.background],
			styles.size && sizes[styles.size],
			styles.transparent && common.borderTransparent
		].join(' '),
		disabled: loading
	}

	const content =
		<>
			{icon && <span className={button.icon}>{!loading && <FontAwesomeIcon icon={icon} />}</span>}
			<span className={button.text}>{loading ? 'Завантаження...' : children}</span>
		</>

	const tags = {
		a: <Link href={link?.href} as={link?.as || ''}><a {...attrs}>{content}</a></Link>,
		button: <button {...attrs}>{content}</button>
	}

	return (tags[tag])
}
