// React & Packages
import { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'

// COMPONENTS
import { CustomInput, DisplayError } from '@/components/utils/'

// Hooks & Lib
import useForm from '@/lib/useForm'
import { useUser } from '@/lib/useUser'
import { useImperativeQuery } from '@/lib/useImperativeQuery'

// GQL Queries & Mutations
import {
  USER_BY_PUBLICID_QUERY,
  ALL_TEAMS_QUERY,
  CREATE_USERONTEAM_MUTATION,
} from '@/graphql/index'

// GENERATED TS
import {
  createUserOnTeam,
  createUserOnTeamVariables,
} from '@/generated/createUserOnTeam'
import {
  userByPublicIdQuery,
  userByPublicIdQueryVariables,
} from '@/generated/userByPublicIdQuery'
import { allTeamsQuery_allTeams } from '@/generated/allTeamsQuery'

const AddNewMemberTextStyles = styled.div`
  color: white;
  padding: 20px;
  padding: 20px;
`

const AddNewMemberFormStyles = styled.form`
  padding: 10px;
  input {
    margin: 0px;
  }
`

const AddNewMemberBoxStyles = styled.div`
  background: #2c2c2c;
  color: white;
  flex: 0 1 100%;
  border-radius: 3px;
`
interface IFormData {
  memberName: string
}

interface IForm {
  inputs: IFormData
  handleChange: (e: any) => void
  resetForm: () => void
  clearForm: () => void
}

const initialError = {
  error: false,
  message: 'There is no error',
}

export const AddMemberButton = ({ team }: { team: allTeamsQuery_allTeams }) => {
  const { data: dataCurrentUser } = useUser()
  const me = dataCurrentUser?.authenticatedUser

  const findUserById = useImperativeQuery<
    userByPublicIdQuery,
    userByPublicIdQueryVariables
  >(USER_BY_PUBLICID_QUERY)

  const [addMemberToTeam, { data, error, loading }] = useMutation<
    createUserOnTeam,
    createUserOnTeamVariables
  >(CREATE_USERONTEAM_MUTATION, {
    refetchQueries: [{ query: ALL_TEAMS_QUERY }],
  })

  const { inputs, resetForm, handleChange, clearForm }: IForm =
    useForm<IFormData>({
      memberName: '',
    })

  const [manualError, setManualError] = useState(initialError)

  const handleSubmit = async () => {
    const res = await findUserById({ publicId: inputs.memberName })
    const dataUser = res.data?.allUsers ? res.data?.allUsers[0] : null
    if (dataUser) {
      if (dataUser.id !== me?.id) {
        const isUserAlreadyInTeam = team?.members?.filter(
          (x) => x?.user?.id === dataUser.id
        ).length
        console.log(isUserAlreadyInTeam)
        if (isUserAlreadyInTeam) {
          setManualError({
            error: true,
            message: 'This user is already in your team',
          })
        } else {
          setManualError(initialError)
          const result = await addMemberToTeam({
            variables: {
              data: {
                user: { connect: { id: dataUser.id } },
                team: { connect: { id: team.id } },
                isAdmin: false,
              },
            },
          })
        }
      } else {
        setManualError({
          error: true,
          message: 'You are already in the team',
        })
      }
    } else {
      setManualError({ error: true, message: "This user doesn't exist" })
    }
  }
  // console.log(manualError)
  return (
    <>
      {manualError.error && <DisplayError error={manualError} />}
      <AddNewMemberBoxStyles>
        <CustomInput
          TextStyles={AddNewMemberTextStyles}
          FormStyles={AddNewMemberFormStyles}
          inputName="memberName"
          handleChange={handleChange}
          buttonText="+ Add a member"
          value={inputs.memberName}
          onSubmit={handleSubmit}
          submitOnBlur={false}
        />
      </AddNewMemberBoxStyles>
    </>
  )
}
