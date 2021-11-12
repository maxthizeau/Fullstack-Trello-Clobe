// Imports :

// React & Packages
import { createRef, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
// Components
import TaskGroup from './TaskGroup'
import TopBar from '../board/TopBar'
import { InfoBox, DisplayError, Loading } from '@/components/utils/index'
// Hooks & Lib
import useForm from '@/lib/useForm'
// GraphQL Queries & Mutations
import { CREATE_TASKGROUP_MUTATION, BOARD_QUERY } from '@/graphql/index'
// Generated TypeScript
import { board } from '@/generated/board'
import { createTaskGroupMutation_createTaskGroup } from '@/generated/createTaskGroupMutation'

// End Imports

const BoardStyles = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 20px;
  width: 100%;
  /* flex-wrap: wrap; */
  /* flex-wrap: nowrap; */
  overflow: scroll;
`

const AppContainer = styled.div`
  /* background-color: var(--mainBlue); */
  padding: 20px 40px;
  font-size: 14px;
  color: #172b4d;
`

const CreateButtonStyles = styled.button`
  width: 272px;
  align-self: flex-start;
  border-radius: 3px;
  padding: 8px 20px;
  cursor: pointer;
  margin-top: 0px;
  background-color: #091e4214;
  color: #172b4d;
  font-weight: normal;
  font-size: 16px;
  min-width: 230px;

  :hover {
    color: #5e6c84;
    background: rgba(255, 255, 255, 0.8);
  }
  span {
    padding: 5px 0px;
  }

  span::before {
    content: '+';
    font-size: 16px;
    height: 20px;
    line-height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  input {
    overflow: 'hidden';
    overflow-wrap: 'break-word';
    height: 28px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    margin: 0;
    width: 100%;
  }

  &:focus-within {
    background: rgba(255, 255, 255, 0.8);
  }
`

interface IBoardProps {
  id: number
}

interface IFormData {
  taskGroupName: string
}

interface IForm {
  inputs: IFormData
  handleChange: (e: any) => void
  resetForm: () => void
  // clearForm: () => void | null
}

const CreateTaskGroupButton = ({ id }: { id: number }) => {
  const createTaskGroupText = createRef<HTMLSpanElement>()
  const addTaskGroupInput = createRef<HTMLInputElement>()
  const [createTaskGroup, { data, error, loading }] =
    useMutation<createTaskGroupMutation_createTaskGroup>(
      CREATE_TASKGROUP_MUTATION
    )

  const { inputs, resetForm, handleChange }: IForm = useForm<IFormData>({
    taskGroupName: '',
  })

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    if (inputs.taskGroupName && id) {
      await createTaskGroup({
        variables: { name: inputs.taskGroupName, boardId: id },
        refetchQueries: [{ query: BOARD_QUERY, variables: { id } }],
      })
    }
    resetForm()
    focusOut()
  }

  function focusOut() {
    addTaskGroupInput.current?.blur()
    createTaskGroupText.current?.classList.replace('hidden', 'visible')
    addTaskGroupInput.current?.classList.replace('visible', 'hidden')
  }

  function handleClick() {
    createTaskGroupText.current?.classList.replace('visible', 'hidden')
    addTaskGroupInput.current?.classList.replace('hidden', 'visible')
    addTaskGroupInput.current?.focus()
  }

  return (
    <CreateButtonStyles onClick={handleClick}>
      <span ref={createTaskGroupText} className="visible">
        Create a Task Group
      </span>
      <form onSubmit={handleSubmit}>
        <input
          className="add-task-group hidden"
          ref={addTaskGroupInput}
          onBlur={focusOut}
          placeholder="Enter name"
          name="taskGroupName"
          value={inputs.taskGroupName}
          onChange={handleChange}
        />
      </form>
    </CreateButtonStyles>
  )
}

const Board = ({ id }: IBoardProps) => {
  const { data, error, loading } = useQuery<board>(BOARD_QUERY, {
    variables: { id },
  })
  if (loading) return <Loading />
  if (error) return <DisplayError error={error} />
  if (data?.board) {
    return (
      <>
        <InfoBox />
        <TopBar board={data.board} />
        <BoardStyles
        // onDrop={drop}
        >
          {data?.board?.taskGroups?.map((taskGroup) => {
            if (!taskGroup) return null
            return (
              <TaskGroup
                taskGroup={taskGroup}
                key={taskGroup.id}
                board={data.board}
              />
            )
          })}

          <CreateTaskGroupButton id={id} />
        </BoardStyles>
      </>
    )
  }

  return null
}

export default Board
