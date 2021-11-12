// Imports :

// React & Packages
import { createRef } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
// Components
// Hooks & Lib
import useForm from '@/lib/useForm'
// GraphQL Queries & Mutations
import { CREATE_TASK_MUTATION, ALL_BOARDS_QUERY } from '@/graphql/index'
// Generated TypeScript
import { createTaskMutation_createTask } from '@/generated/createTaskMutation'
import { BOARD_QUERY } from '../../../lib/graphql/board'

// End Imports

interface IFormData {
  taskName: string
}

interface IForm {
  inputs: IFormData
  handleChange: (e: any) => void
  resetForm: () => void
  clearForm: () => void | null
}

const AddTaskButtonStyles = styled.div`
  border-radius: 3px;
  padding: 8px 20px;
  cursor: pointer;
  color: #5e6c84;

  &:hover {
    background-color: #091e4214;
    color: #172b4d;
  }

  .addNewTaskText::before {
    content: '+';
    font-size: 16px;
    height: 20px;
    line-height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  .add-task-area {
    background: #0000;
    border-radius: 3px;
    box-shadow: none;
    height: 20px;
    margin: -4px 0;
    max-height: 256px;
    min-height: 28px;
    padding: 4px 8px;
    resize: none;
    border: none;
    font-family: 'Roboto';
    color: #5e6c84;
    overflow: 'hidden';
    overflow-wrap: 'break-word';
    height: 28px;
  }
`

export const AddTaskButton = ({
  taskGroupId,
  boardId = null,
}: {
  taskGroupId: number
  boardId: number | null
}) => {
  // References
  const createTaskButton = createRef<HTMLSpanElement>()
  const addTaskInput = createRef<HTMLInputElement>()

  // Mutations : Create Task and Delete Task Group
  const [createTask, { data, error, loading }] =
    useMutation<createTaskMutation_createTask>(CREATE_TASK_MUTATION)

  // Form Hook for Add New Task Button
  const { inputs, resetForm, handleChange }: IForm = useForm<IFormData>({
    taskName: '',
  })

  // Handle Click on "Add New Task" button
  function handleClick() {
    addTaskInput.current?.classList.replace('hidden', 'visible')
    createTaskButton.current?.classList.replace('visible', 'hidden')
    addTaskInput.current?.focus()
  }

  // When click outside Add New Task Form
  function focusOut() {
    addTaskInput.current?.classList.replace('visible', 'hidden')
    createTaskButton.current?.classList.replace('hidden', 'visible')
    addTaskInput.current?.blur()
  }

  // Handle Submit New Task
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (inputs.taskName && taskGroupId) {
      // console.log('Submitted')
      await createTask({
        variables: { name: inputs.taskName, taskGroupId: taskGroupId },
        refetchQueries: [
          { query: ALL_BOARDS_QUERY },
          { query: BOARD_QUERY, variables: { id: boardId } },
        ],
      })
    }
    inputs.taskName = ''
    focusOut()
  }

  return (
    <AddTaskButtonStyles>
      <span
        className="addNewTaskText visible"
        onClick={handleClick}
        ref={createTaskButton}
      >
        Create a task
      </span>
      <form onSubmit={handleSubmit}>
        <input
          className="add-task-area hidden"
          ref={addTaskInput}
          onBlur={focusOut}
          placeholder="Name"
          name="taskName"
          value={inputs.taskName}
          onChange={handleChange}
        />
      </form>
    </AddTaskButtonStyles>
  )
}
