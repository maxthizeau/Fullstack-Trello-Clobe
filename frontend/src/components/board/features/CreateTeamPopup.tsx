// Imports :

// React & Packages
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
// Components
import { DeleteIcon } from '@/components/utils'
// Hooks & Lib
import { useUser } from '@/lib/useUser'
import useAppConfig from '@/lib/appConfig/useAppConfig'
import { useImperativeQuery } from '@/lib/useImperativeQuery'
// GraphQL Queries & Mutations
import { USER_BY_PUBLICID_QUERY, CREATE_TEAM_MUTATION } from '@/graphql/index'
// Generated TypeScript
import { createTeamMutationVariables } from '@/generated/createTeamMutation'
import {
  userByPublicIdQuery_allUsers,
  userByPublicIdQuery,
} from '@/generated/userByPublicIdQuery'
import { RelateToManyUserOnTeamInput } from '@/generated/graphql-global-types'
import { createTeamMutation } from '@/generated/createTeamMutation'
import { userByPublicIdQueryVariables } from '@/generated/userByPublicIdQuery'

// End Imports

const PopupStyles = styled.div`
  width: 100vw;
  height: 100vh;
  background: #00000042;
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;

  .content-popup {
    background-color: #f4f5f7;
    flex: 0 0 60%;
    align-self: baseline;
    padding: 20px 40px;
    border-radius: 2px;
    margin: 48px 0 80px;
    overflow: hidden;
    position: relative;
  }

  .inline-button {
    height: 40px;
    margin: 12px 0 0 10px;
    flex: 1 0 content;
  }

  .error-message {
    color: #a71717;
    margin-bottom: 25px;
    margin-left: 5px;
    font-style: italic;
  }
`

const MembersListStyles = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 50px;

  .member-box {
    flex: 1 1;
    border-radius: 3px;
    background: white;
    padding: 10px 20px;
    max-width: 33%;
    position: relative;
  }
`

export const CloseIcon = styled.span`
  background-clip: padding-box;
  background-color: #f4f5f7;
  background-origin: initial;
  border-radius: 3px;
  opacity: 0.8;
  padding: 4px 6px;
  position: absolute;
  right: 10px;
  top: 15px;
  z-index: 50;
  visibility: visible;
  cursor: pointer;

  :before {
    content: '❌';
    font-size: 20px;
    padding: 10px;

    /* z-index: 40; */
  }

  &:hover {
    background-color: #eed2d2;
  }
`

export const CreateTeamPopup = () => {
  // UseState to handle/show errors
  const initialError = {
    error: false,
    message: 'There is no error',
  }

  const { showModal, toggleModal } = useAppConfig()

  // Get current user so we can add him directly to the team
  const { data, error, loading } = useUser()
  const me = data?.authenticatedUser

  const [membersList, setMembersList] = useState<
    userByPublicIdQuery_allUsers[]
  >([])
  const [manualError, setManualError] = useState(initialError)
  const [done, setDone] = useState(false)

  const [createTeam, resultCreateTeam] = useMutation<
    createTeamMutation,
    createTeamMutationVariables
  >(CREATE_TEAM_MUTATION)

  // First attempt to use react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  // Query user by publicId
  const findUserById = useImperativeQuery<
    userByPublicIdQuery,
    userByPublicIdQueryVariables
  >(USER_BY_PUBLICID_QUERY)

  const onSubmit = async (dataForm: any) => {
    const res = await findUserById({ publicId: dataForm.member })
    const dataUser = res.data?.allUsers ? res.data?.allUsers[0] : null
    if (dataUser) {
      if (dataUser.id !== me?.id) {
        if (!membersList.includes(dataUser)) {
          setMembersList([...membersList, dataUser])
          setManualError(initialError)
        } else {
          setManualError({
            error: true,
            message: 'This user is already in your team',
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

  const save = async (dataForm: any) => {
    const membersVariable: RelateToManyUserOnTeamInput = { create: [] }

    me &&
      membersVariable.create?.push({
        user: { connect: { id: me.id } },
        isAdmin: true,
      })
    // Create Args for query
    membersList.forEach((member) => {
      membersVariable.create?.push({
        user: { connect: { id: member.id } },
        isAdmin: member.id === me?.id,
      })
    })

    await createTeam({
      variables: { name: dataForm.teamName, members: membersVariable },
    })
    setDone(true)
  }

  const removeFromMembersList = (member: userByPublicIdQuery_allUsers) => {
    //   if(member !== meAsMember) {
    const newMemberList = membersList.filter((item) => item !== member)
    setMembersList(newMemberList)
    //   }
  }

  function closeModal() {
    setMembersList([])
    setDone(false)
    reset({ teamName: '', member: '' })
    toggleModal()
  }

  if (!showModal) {
    return null
  }

  return (
    <PopupStyles>
      <div className="content-popup">
        <CloseIcon onClick={closeModal} />
        {done && (
          <p>
            The team has been created. TODO : Add recap and button to assign
            board, ...
          </p>
        )}
        {!done && (
          <>
            <h2>Create a Team</h2>
            <hr />
            <form>
              <label>
                <span>Team's name :</span>
                <input
                  type="text"
                  placeholder="Give this team a name"
                  {...register('teamName')}
                />
              </label>
            </form>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                <span>Members : </span>
                <div className="split">
                  <input
                    type="text"
                    placeholder="Public name (ex : maximethizeau#12345)"
                    {...register('member')}
                  />

                  <button className="inline-button" type="submit">
                    ADD TO THE TEAM
                  </button>
                </div>
                {manualError.error && (
                  <div className="error-message">{manualError.message}</div>
                )}
              </label>
            </form>
            <MembersListStyles>
              <div
                key={me?.id}
                className="member-box"
                style={{ background: '#f3f3f3', border: '1px solid #CCC' }}
              >
                <p>
                  <b>{me?.name}</b>
                </p>
                <p>
                  <i>{me?.publicId}</i>
                </p>
                {/* <p>
                  <i>Role : Admin</i>
                </p> */}
              </div>
              {membersList.map((x) => {
                if (!x) return null
                return (
                  <div key={x.id} className="member-box">
                    <DeleteIcon onClick={(e) => removeFromMembersList(x)} />
                    <p>
                      <b>{x.name}</b>
                    </p>
                    <p>
                      <i>{x.publicId}</i>
                    </p>
                    {/* <p>
                  <i>Role : Admin</i>
                </p> */}
                  </div>
                )
              })}
            </MembersListStyles>
            <hr />

            <button
              style={{ marginTop: '20px' }}
              type="submit"
              onClick={handleSubmit(save)}
            >
              Save
            </button>
          </>
        )}
      </div>
    </PopupStyles>
  )
}
