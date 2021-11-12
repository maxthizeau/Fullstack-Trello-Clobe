import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/client'
import MainApp from '../components/MainApp'

const IndexPage: NextPage = () => {
  const [t] = useTranslation('common')
  const apolloClient = useApolloClient()

  return (
    <>
      <MainApp />
    </>
  )
}

export default IndexPage
