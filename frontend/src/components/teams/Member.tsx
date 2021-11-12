// Imports :

// React & Packages
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
// Components
import { DeleteIcon } from '@/components/utils/Icons'
// Hooks & Lib
import { useUser } from '@/lib/useUser'
// GraphQL Queries & Mutations
import {
  DELETE_USERONTEAM_MUTATION,
  UPDATE_USERONTEAM_MUTATION,
} from '@/graphql/index'
// Generated TypeScript
import { allTeamsQuery_allTeams_members } from '@/generated/allTeamsQuery'
import {
  deleteUserOnTeamMutation,
  deleteUserOnTeamMutationVariables,
} from '@/generated/deleteUserOnTeamMutation'
import {
  updateUserOnTeamMutation,
  updateUserOnTeamMutationVariables,
} from '@/generated/updateUserOnTeamMutation'

// End Imports

const UtilBox = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  display: none;
`

const MemberStyles = styled.div`
  background: #e6e6e6;
  width: 100%;
  padding: 0px 20px;
  color: #3a3a3a;
  border-radius: 3px;
  display: flex;
  flex: 1 0 45%;
  position: relative;

  .member-name {
    flex: 1 0;
  }
  .member-role {
    margin-top: 16px;
  }

  &.member-myself {
    background-color: white;
    color: #342286;
  }
  &:hover ${UtilBox} {
    display: block;
  }
`

const SwitchIcon = styled.div`
  position: absolute;
  top: -10px;
  right: 20px;
  padding: 5px 8px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: var(--lightGrey);
  }

  &:before {
    content: '🔁';
  }
`

interface IMemberProps {
  member: allTeamsQuery_allTeams_members
}

export const Member = ({ member }: IMemberProps) => {
  const currentUser = useUser()
  const me = currentUser.data?.authenticatedUser

  const [deleteUserOnTeam, resultDelete] = useMutation<
    deleteUserOnTeamMutation,
    deleteUserOnTeamMutationVariables
  >(DELETE_USERONTEAM_MUTATION)
  const [updateUserOnTeam, resultUpdate] = useMutation<
    updateUserOnTeamMutation,
    updateUserOnTeamMutationVariables
  >(UPDATE_USERONTEAM_MUTATION)

  const handleDelete = async () => {
    await deleteUserOnTeam({
      variables: { id: member.id },
    }).catch((err) => console.log(err))
    resultDelete.client.cache.evict({ id: `UserOnTeam:${member.id}` })
  }
  const handleSwitch = async () => {
    await updateUserOnTeam({
      variables: { id: member.id, data: { isAdmin: !member.isAdmin } },
    }).catch((err) => console.log(err))
    resultDelete.client.cache.modify({
      id: `UserOnTeam:${member.id}`,
      fields: {
        isAdmin(isAdmin) {
          return !isAdmin
        },
      },
    })
  }

  return (
    <MemberStyles
      className={member?.user?.id === me?.id ? 'member-myself' : 'no'}
    >
      {member?.user?.id !== me?.id && (
        <UtilBox>
          <DeleteIcon onClick={handleDelete} />
          <SwitchIcon onClick={handleSwitch} />
        </UtilBox>
      )}
      <p className="member-name">
        {member.user?.name}
        <br />
        <i>{member.user?.publicId}</i>
        <br />
        <span className="member-role">
          Role : {member.isAdmin ? 'Admin' : 'User'}
        </span>
      </p>
      {/* <p className="member-role">
      Role : {member.isAdmin ? 'Admin' : 'User'}
    </p> */}
    </MemberStyles>
  )
}
