import { GetServerSidePropsContext, NextPage } from 'next'
import ErrorPage from 'next/error'
import { addApolloState, initializeApollo } from '@/lib/apollo'
import { useRouter } from 'next/router'
import { BOARD_QUERY } from '@/graphql/index'
import Board from '@/components/board/Board'

interface IBoardPageProps {
  id?: number
}

const BoardPage: NextPage<IBoardPageProps> = ({ id }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <p>Loading...</p>
  }
  if (!id) {
    return <ErrorPage statusCode={404} />
  }

  return <Board id={id} />
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = initializeApollo({ headers: context?.req?.headers })
  const id = (context?.query?.id as string) ?? ''

  try {
    const res = await client.query({
      query: BOARD_QUERY,
      variables: {
        id: parseInt(id),
      },
    })

    return addApolloState(client, {
      props: { id: parseInt(id) },
    })
  } catch {
    return {
      props: {},
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
}

export default BoardPage
