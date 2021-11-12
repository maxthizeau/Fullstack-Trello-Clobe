import { allTeamsQuery } from '@/generated/allTeamsQuery'
import { ALL_TEAMS_QUERY } from '@/graphql/allTeams'
import { CREATE_BOARD_MUTATION } from '@/graphql/createBoard'
import { useUser } from '@/lib/useUser'
import { useMutation, useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { allTeamsQueryVariables } from '../../lib/graphql/generated/allTeamsQuery'
import { ALL_BOARDS_QUERY } from '../../lib/graphql/allBoards'
import {
  createBoardMutation,
  createBoardMutationVariables,
} from '../../lib/graphql/generated/createBoardMutation'
import { useState } from 'react'
import { CloseIcon } from '../board/features/CreateTeamPopup'
import { allBoards_allBoards } from '../../lib/graphql/generated/allBoards'
import { board_board } from '../../lib/graphql/generated/board'
import {
  updateBoardMutation,
  updateBoardMutationVariables,
} from '../../lib/graphql/generated/updateBoardMutation'
import { UPDATE_BOARD_MUTATION } from '@/graphql/updateBoard'
import { BOARD_QUERY } from '@/graphql/board'

const ManageBoardPopupStyles = styled.div`
  width: 100vw;
  height: 100vh;
  background: #00000042;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: first baseline;
  z-index: 100;
`

const PopupStyles = styled.div`
  background-color: #f4f5f7;
  flex: 0 0 60%;
  align-self: baseline;
  padding: 20px 40px;
  border-radius: 2px;
  margin: 48px 0 80px;
  overflow: hidden;
  position: relative;
  z-index: 100;

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

interface IManageBoardPopup {
  type: string
  close: () => void
  currentBoard?: allBoards_allBoards | board_board | null
}

export const ManageBoardPopup = ({
  type = 'create',
  close,
  currentBoard = null,
}: IManageBoardPopup) => {
  const { data, error, loading } = useUser()
  const me = data?.authenticatedUser

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const {
    data: allTeamsData,
    error: allTeamsError,
    loading: allTeamsLoading,
  } = useQuery<allTeamsQuery, allTeamsQueryVariables>(ALL_TEAMS_QUERY)

  const [createBoard, resultCreateBoard] = useMutation<
    createBoardMutation,
    createBoardMutationVariables
  >(CREATE_BOARD_MUTATION)
  const [updateBoard, resultUpdateBoard] = useMutation<
    updateBoardMutation,
    updateBoardMutationVariables
  >(UPDATE_BOARD_MUTATION)

  const onSubmit = async (data: any) => {
    if (type === 'create') {
      await handleCreateSubmit(data)
    } else if (type === 'update') {
      await handleUpdateSubmit(data)
    } else {
      console.log('Type undefined')
    }
    close()
  }

  const handleCreateSubmit = async (data: any) => {
    if (!me || !data.name || !data.description) {
      return null
    }

    const variables: createBoardMutationVariables = {
      data: {
        name: data.name,
        description: data.description,
        owner: { connect: { id: me.id } },
        team:
          data.team != 0 ? { connect: { id: Number(data.team) } } : undefined,
      },
    }

    await createBoard({
      variables: variables,
      refetchQueries: [{ query: ALL_BOARDS_QUERY }],
    }).catch((err) => console.log(err))
  }
  const handleUpdateSubmit = async (data: any) => {
    if (!me || !data.name || !data.description || !currentBoard) {
      return null
    }

    const variables: updateBoardMutationVariables = {
      updateBoardId: currentBoard.id,
      data: {
        name: data.name,
        description: data.description,
        owner: {
          connect: {
            id:
              data.team == 0 || !currentBoard.owner
                ? me.id
                : currentBoard.owner?.id,
          },
        },
        team:
          data.team != 0 ? { connect: { id: Number(data.team) } } : undefined,
      },
    }

    await updateBoard({
      variables: variables,
      refetchQueries: [
        { query: ALL_BOARDS_QUERY },
        { query: BOARD_QUERY, variables: { id: currentBoard.id } },
      ],
    }).catch((err) => console.log(err))
    console.log('Updated')
  }
  return (
    <>
      <ManageBoardPopupStyles>
        <PopupStyles>
          <CloseIcon onClick={close} />
          <h2>{type === 'create' ? 'Create' : 'Update'} a Board</h2>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span>Name :</span>
              <input
                type="text"
                placeholder="Give this board a name"
                defaultValue={type === 'update' ? currentBoard?.name ?? '' : ''}
                {...register('name')}
              />
            </label>
            <hr />
            <label>
              <span>Description :</span>
              <input
                type="text"
                placeholder="Try to describe this board"
                defaultValue={
                  type === 'update' ? currentBoard?.description ?? '' : ''
                }
                {...register('description')}
              />
            </label>
            <hr />
            <label>
              <span>Team :</span>
              <select
                {...register('team')}
                defaultValue={
                  type === 'update' ? currentBoard?.team?.id ?? 0 : 0
                }
              >
                <option value="0">Only me</option>
                {allTeamsData?.allTeams?.map((team) => {
                  if (!team) {
                    return null
                  }
                  return (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  )
                })}
              </select>
            </label>
            <hr />
            <button type="submit">
              {type === 'create' ? 'Create' : 'Update'}
            </button>
          </form>
        </PopupStyles>
      </ManageBoardPopupStyles>
    </>
  )
}
