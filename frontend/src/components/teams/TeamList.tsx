// Imports :

// React & Packages
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
// Components
import { DisplayError, Loading } from '@/components/utils'
import { TeamBox } from './TeamBox'
// Hooks & Lib
// GraphQL Queries & Mutations
import { ALL_TEAMS_QUERY } from '@/graphql/index'
// Generated TypeScript
import { allTeamsQuery } from '@/generated/allTeamsQuery'
import { allTeamsQueryVariables } from '@/generated/allTeamsQuery'
import { SortTeamBy } from '@/generated/graphql-global-types'
import { allTeamsQuery_allTeams_members } from '@/generated/allTeamsQuery'

// End Imports

const TeamListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const reorderTeamArray = (
  members: (allTeamsQuery_allTeams_members | null)[] | null
) => {
  const arrayAdmins: allTeamsQuery_allTeams_members[] = []
  const arrayUsers: allTeamsQuery_allTeams_members[] = []

  members?.map((member) => {
    if (member)
      member?.isAdmin ? arrayAdmins.push(member) : arrayUsers.push(member)
  })

  // console.log('Admins : ', arrayAdmins)
  // console.log('Users : ', arrayUsers)
  return arrayAdmins.concat(arrayUsers)
}

export const TeamList = () => {
  const { data, error, loading } = useQuery<
    allTeamsQuery,
    allTeamsQueryVariables
  >(ALL_TEAMS_QUERY, {
    variables: {
      where: {
        members: { AND: [{ isAdmin_is: true }, { user: { id_is: 212 } }] },
      },
      sortBy: [SortTeamBy.id_ASC],
    },
  })
  // Only query teams where current user is admin
  if (loading) return <Loading />
  if (error) return <DisplayError error={error} />

  return (
    <TeamListStyles>
      {data?.allTeams?.map((team) => {
        if (!team) {
          return null
        }
        const teamOrdered = { ...team, members: reorderTeamArray(team.members) }
        return <TeamBox key={teamOrdered.id} team={teamOrdered} />
      })}
    </TeamListStyles>
  )
}
