import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import button from '../../styles/AdminLayout/components/buttons.module.scss';
import Link from 'next/link';

export default function Button({children, color, tag = 'button', link, background, loading = false, icon, clickAct}) {
	const colors = {
		primary: button.btnPrimary,
		outlineLight: button.btnOutlineLight
	}

	const backgrounds = {
		white: button.bgWhite
	}

	const attrs = {
		onClick: clickAct,
		className: [
			button.btn,
			colors[color] || button.btnPrimary,
			background && backgrounds[background]
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
