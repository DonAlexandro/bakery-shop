import '../styles/globals.scss'
import NextNprogress from 'nextjs-progressbar'
import {AlertProvider} from '../context/alert/AlertProvider';

function MyApp({ Component, pageProps }) {
	return (
		<AlertProvider>
			<NextNprogress
				color="#E87330"
				startPosition={0.3}
				stopDelayMs={100}
				height="3"
			/>
			<Component {...pageProps} />
		</AlertProvider>
	)
}

export default MyApp
