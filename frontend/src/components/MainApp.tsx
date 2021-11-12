// Imports :

// React & Packages
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import styled from 'styled-components'
// Components
import { InfoBox, DisplayError, Loading, CreateBoardButton } from './utils/'
// Hooks & Lib
// GraphQL Queries & Mutations
import { ALL_BOARDS_QUERY } from '@/lib/graphql'
// Generated TypeScript
import {
  allBoards,
  allBoards_allBoards_taskGroups,
} from '@/lib/graphql/generated/allBoards'

// End Imports

const AppContainer = styled.div`
  /* background-color: var(--mainBlue); */
  padding: 20px 40px;
  font-size: 14px;
  color: #172b4d;
`

const BoardListStyles = styled.div`
  display: flex;
  /* flex-direction: row; */

  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`

const BoardItemStyles = styled.div`
  background-color: rgba(255, 255, 255, 0.726);
  border-radius: 3px;
  padding: 20px 40px;
  flex: 1 0 21%;
  text-align: center;

  & a {
    color: #292929;
  }

  &.create-board-button {
    flex: 0 1 100%;
    background: #ffffff36;
    font-size: 1.2em;
    &:hover {
      background: rgba(255, 255, 255, 0.726);
    }
  }
`

const MainApp = () => {
  const { data, error, loading } = useQuery<allBoards>(ALL_BOARDS_QUERY)
  if (loading) return <Loading />
  if (error) return <DisplayError error={error} />
  if (data?.allBoards) {
    return (
      <AppContainer>
        <InfoBox />
        <BoardListStyles>
          {data?.allBoards?.map((board) => {
            if (!board) {
              return null
            }
            const count = function (
              ary: (allBoards_allBoards_taskGroups | null)[] | null
            ) {
              let countValue = 0
              ary?.map((x) => {
                const taskCount = x?.tasks ? x.tasks.length : 0
                countValue += taskCount
              })

              return countValue
            }

            const taskCount = count(board.taskGroups)
            return (
              <BoardItemStyles key={board.id}>
                <Link href={`/board/${board.id}`}>
                  <a>
                    <h2>{board.name}</h2>
                    <p>👪 {board.team ? board.team.name : 'Me'}</p>
                    <div className="split">
                      <span>{board.taskGroups?.length} Task Groups</span>
                      <span>
                        {taskCount} Task{taskCount > 1 ? 's' : ''}
                      </span>
                    </div>
                  </a>
                </Link>
              </BoardItemStyles>
            )
          })}
          <BoardItemStyles className="create-board-button">
            <CreateBoardButton />
          </BoardItemStyles>
        </BoardListStyles>
      </AppContainer>
    )
  }
  return null
}

export default MainApp
