import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { DisplayError } from '@/components/utils'
import { useUser } from '@/lib/useUser'

const ALL_USERS_QUERY = gql`
  query allTeams {
    allTeams {
      id
    }
  }
`

const UsersPage: NextPage = () => {
  const userData = useUser()
  console.log('userdata : ', userData.data)
  const { data, error, loading } = useQuery(ALL_USERS_QUERY)
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return (
      <p>
        <DisplayError error={error} />
      </p>
    )
  }

  return <div> Hello, this is the user page {JSON.stringify(data)}</div>
}

export default UsersPage
