import '../styles/globals.scss'
import NextNprogress from 'nextjs-progressbar'
import {AlertProvider} from '../context/alert/AlertProvider'
import {AuthProvider} from '../hooks/useAuth'
import {LoadingProvider} from '../context/loading/LoadingProvider'
import {wrapper} from '../redux/store'

function MyApp({Component, pageProps}) {
	return (
		<AuthProvider>
			<AlertProvider>
				<LoadingProvider>
					<NextNprogress
						color="#E87330"
						startPosition={0.3}
						stopDelayMs={100}
						height="3"
					/>
					<Component {...pageProps} />
				</LoadingProvider>
			</AlertProvider>
		</AuthProvider>
	)
}

export default wrapper.withRedux(MyApp)
