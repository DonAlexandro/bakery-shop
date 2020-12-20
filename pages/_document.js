import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html land="uk-UA">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="author" content="Alexandro [parashnokwtf@gmail.com]" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
