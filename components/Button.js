export default function Button({styles, text, loading}) {
	return (
		<button
			disabled={loading}
			className={styles.join(' ')}
		>
			{loading ? 'Завантаження...' : text}
		</button>
	)
}
