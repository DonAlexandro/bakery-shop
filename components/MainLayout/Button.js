import classes from '../../styles/MainLayout/components/buttons.module.scss'

export default function Button({children, color, loading, actions}) {
	const colors = {
		primary: classes.btnPrimary
	}

	return (
		<button
			disabled={loading}
			className={[
				classes.btn,
				colors[color] || classes.btnPrimary
			].join(' ')}
			onClick={actions.onClick}
		>
			{loading ? 'Завантаження...' : children}
		</button>
	)
}
