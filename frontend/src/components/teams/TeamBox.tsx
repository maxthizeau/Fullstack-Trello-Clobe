import { useMutation } from '@apollo/client'
import styled from 'styled-components'

// Hooks
import useForm from '@/lib/useForm'
import { useUser } from '@/lib/useUser'

// Components
import { AddMemberButton } from './AddMemberButton'
import { DeleteIcon, CustomInput } from '@/components/utils'
import { Member } from './Member'

// GraphQL Types and Queries/Mutations
import {
  DELETE_TEAM_MUTATION,
  ALL_TEAMS_QUERY,
  UPDATE_TEAM_MUTATION,
} from '@/graphql/index'
import {
  deleteTeamMutation,
  deleteTeamMutationVariables,
} from '@/generated/deleteTeamMutation'
import {
  updateTeamMutation,
  updateTeamMutationVariables,
} from '@/generated/updateTeamMutation'
import { allTeamsQuery_allTeams } from '@/generated/allTeamsQuery'

const TeamStyles = styled.div`
  border: 1px solid var(--grey);
  background: var(--grey);
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 30px;
  flex: 1 0 48%;
  position: relative;
  /* max-width: 30%; */
`

const TeamTitleStyles = styled.h3`
  font-weight: bold;
  color: white;
  padding: 10px;
  width: 80%;
`

const CustomFormStyles = styled.form`
  input {
    margin: 0px;
  }
`

const MemberList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

interface ITeamBoxProps {
  team: allTeamsQuery_allTeams
}

interface IFormData {
  teamName: string
}

interface IForm {
  inputs: IFormData
  handleChange: (e: any) => void
  resetForm: () => void
  clearForm: () => void
}

export const TeamBox = ({ team }: ITeamBoxProps) => {
  const currentUser = useUser()
  const me = currentUser.data?.authenticatedUser

  const { inputs, resetForm, handleChange, clearForm }: IForm =
    useForm<IFormData>({
      teamName: team.name ?? '',
    })

  const [updateTeam, { error, data, loading }] = useMutation<
    updateTeamMutation,
    updateTeamMutationVariables
  >(UPDATE_TEAM_MUTATION)

  const [deleteTeam, resultDelete] = useMutation<
    deleteTeamMutation,
    deleteTeamMutationVariables
  >(DELETE_TEAM_MUTATION, { refetchQueries: [{ query: ALL_TEAMS_QUERY }] })

  const handleSubmit = async () => {
    updateTeam({ variables: { id: team.id, name: inputs.teamName } })
    console.log('Update done !')
  }

  const handleDelete = async () => {
    const confirmDelete = confirm(
      `Please confirm : You will delete teal #${team.id} and transfert all its board to yourself only`
    )
    if (confirmDelete) {
      await deleteTeam({
        variables: { id: team.id },
      }).catch((err) => console.log(err))
      resultDelete.client.cache.evict({ id: `Team:${team.id}` })
    }
  }

  const isCurrentUserAdmin = team?.members?.find(
    (x) => x?.user?.id === me?.id
  )?.isAdmin

  return (
    <TeamStyles>
      <DeleteIcon onClick={handleDelete} />
      <div style={{ width: '80%' }}>
        {me && isCurrentUserAdmin ? (
          <CustomInput
            TextStyles={TeamTitleStyles}
            FormStyles={CustomFormStyles}
            inputName="teamName"
            handleChange={handleChange}
            value={inputs.teamName}
            onSubmit={handleSubmit}
            submitOnBlur={true}
          />
        ) : (
          <TeamTitleStyles>{inputs.teamName}</TeamTitleStyles>
        )}
      </div>
      <MemberList>
        {team.members?.map((member) => {
          if (!member) {
            return null
          }
          return <Member key={member.id} member={member} />
        })}
        <AddMemberButton team={team} />
      </MemberList>
    </TeamStyles>
  )
}
