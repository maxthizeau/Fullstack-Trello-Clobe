import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import i18n, { initialI18nSettings, Language } from '../lib/i18n'
import { useApollo } from '../lib/apollo'
import Page from '../components/Page'
import { NextComponentType } from 'next'
import { DocumentContext } from 'next/document'

i18n.init({
  ...initialI18nSettings,
  lng: Language.FR,
})

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

interface IInitialProps {
  Component: NextComponentType
  ctx: DocumentContext
}
// App.getInitialProps = async function ({ Component, ctx }: IInitialProps) {
//   console.log('Run on APP')
//   let pageProps = {}
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }
//   // pageProps.query = ctx.query;
//   return { pageProps }
// }

export default App
