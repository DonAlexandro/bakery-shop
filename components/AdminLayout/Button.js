export default function Button({children, styles, loading}) {
	return (
		<button
			className={styles.join(' ')}
			disabled={loading}
		>
			{loading ? 'Завантаження...' : children}
		</button>
	)
}