// Imports :

// React & Packages
import { createRef } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
// Components
// Hooks & Lib
import useForm from '@/lib/useForm'
// GraphQL Queries & Mutations
import { ALL_BOARDS_QUERY, UPDATE_TASKGROUP_MUTATION } from '@/graphql/index'
// Generated TypeScript
import { updateTaskGroupMutation_updateTaskGroup } from '@/generated/updateTaskGroupMutation'

// End Imports

interface IFormData {
  taskGroupName: string
}

interface IForm {
  inputs: IFormData
  handleChange: (e: any) => void
  resetForm: () => void
  clearForm: () => void | null
}

const TitleStyles = styled.div`
  font-weight: bold;
  font-size: 1.05em;
  padding: 10px 20px;
  border-radius: 3px;
  margin: 5px 0px;

  form {
    display: none;
  }

  &.on-edit {
    .title {
      display: none;
    }
    form {
      display: block;
    }
    input {
      margin: 0 0 0 -10px;
      width: 90%;
      height: 34px;
      font-size: 1em;
      border: none;
      background: #f0f2f5;
    }
  }
`

export const TaskGroupTitle = ({
  taskGroupId,
  taskGroupName,
}: {
  taskGroupId: number
  taskGroupName: string
}) => {
  // References
  const taskGroupTitleBlock = createRef<HTMLDivElement>()
  const updateTaskGroupNameInput = createRef<HTMLInputElement>()

  // Mutations : Update Task
  const [updateTaskGroup, { data, error, loading }] =
    useMutation<updateTaskGroupMutation_updateTaskGroup>(
      UPDATE_TASKGROUP_MUTATION
    )

  // Form Hook
  const { inputs, resetForm, handleChange }: IForm = useForm<IFormData>({
    taskGroupName: taskGroupName ?? '',
  })

  // Handle Click on the title
  function handleClickTitle() {
    taskGroupTitleBlock.current?.classList.add('on-edit')
    updateTaskGroupNameInput.current?.focus()
  }

  // When click outside Change Title Form
  function stopEdit() {
    taskGroupTitleBlock.current?.classList.remove('on-edit')
  }

  async function handleSubmitGroupName(e: React.SyntheticEvent) {
    e.preventDefault()
    stopEdit()
    if (inputs.taskGroupName && taskGroupId) {
      await updateTaskGroup({
        variables: { name: inputs.taskGroupName, id: taskGroupId },
        refetchQueries: [{ query: ALL_BOARDS_QUERY }],
      })
    }
  }

  return (
    <TitleStyles ref={taskGroupTitleBlock} onClick={handleClickTitle}>
      <span className="title">{taskGroupName}</span>
      <form onSubmit={handleSubmitGroupName}>
        <input
          ref={updateTaskGroupNameInput}
          name="taskGroupName"
          value={inputs.taskGroupName}
          onChange={handleChange}
          onBlur={stopEdit}
        />
      </form>
    </TitleStyles>
  )
}
