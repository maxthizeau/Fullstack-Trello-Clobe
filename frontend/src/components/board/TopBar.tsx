// Imports :

// React & Packages
import { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
// Components
import { ManageBoardPopup } from '@/components/utils'
// Hooks & Lib
// GraphQL Queries & Mutations
import { DELETE_BOARD_MUTATION, ALL_BOARDS_QUERY } from '@/graphql/index'
// Generated TypeScript
import { board_board } from '@/generated/board'
import {
  deleteBoardMutation,
  deleteBoardMutationVariables,
} from '@/generated/deleteBoardMutation'

// End Imports

const TopBarStyles = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const LinkStyles = styled.div`
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  color: white;

  a {
    color: white;
  }

  &.buttonLink {
    cursor: pointer;
    background: #38327540;
    box-shadow: 0px 0px 3px #ccc;
  }
  &.buttonLink:hover {
    background-color: #4a4a4a99;
    transition: 0.2s;
  }
`

interface ITopBarProps {
  board: board_board
}

const TopBar = ({ board }: ITopBarProps) => {
  const router = useRouter()
  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [deleteBoard, resultDeleteBoard] = useMutation<
    deleteBoardMutation,
    deleteBoardMutationVariables
  >(DELETE_BOARD_MUTATION)

  const handleDeleteBoard = async () => {
    const confirmDelete = confirm(
      `Please confirm : You will delete the board #${board.id} and all its task groups and tasks`
    )
    if (confirmDelete) {
      await deleteBoard({
        variables: { deleteBoardId: board.id },
        refetchQueries: [{ query: ALL_BOARDS_QUERY }],
      })
        .catch((err) => console.log(err))
        .then(() => {
          router.push('/')
        })
    }
  }

  const teamName = board.team ? board.team.name : 'Me'

  return (
    <>
      {showUpdatePopup && (
        <ManageBoardPopup
          type="update"
          close={() => setShowUpdatePopup(false)}
          currentBoard={board}
        />
      )}
      <TopBarStyles>
        <LinkStyles>Board : {board.name}</LinkStyles>
        <LinkStyles>Team : {teamName}</LinkStyles>
        <LinkStyles
          className="buttonLink"
          onClick={() => setShowUpdatePopup(true)}
        >
          <a>Update this board</a>
        </LinkStyles>
        <LinkStyles className="buttonLink" onClick={handleDeleteBoard}>
          <a>Delete</a>
        </LinkStyles>
      </TopBarStyles>
    </>
  )
}

export default TopBar
