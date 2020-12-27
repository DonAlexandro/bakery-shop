import classes from '../../styles/MainLayout/components/buttons.module.scss'
import Link from 'next/link';

export default function Button({children, styles = {}, loading = false, actions = {}, tag = 'button', link = {}}) {
	const colors = {
		primary: classes.btnPrimary
	}

	const attrs = {
		className: [
			styles.block ? classes.btnBlock : classes.btn,
			colors[styles.color] || classes.btnPrimary
		].join(' '),
		disabled: loading,
		onClick: actions.onClick
	}

	const content = loading ? 'Завантаження...' : children

	const tags = {
		a:
			<Link href={link.href} as={link.as || ''}>
				<a {...attrs}>{content}</a>
			</Link>,
		button: <button {...attrs}>{content}</button>
	}

	return (tags[tag])
}
