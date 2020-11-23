import '../styles/globals.scss'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextNprogress
				color="#E87330"
				startPosition={0.3}
				stopDelayMs={100}
				height="3"
			/>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
