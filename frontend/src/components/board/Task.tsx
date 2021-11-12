// Imports :

// React & Packages
import { createRef, DragEvent, SyntheticEvent, useState } from 'react'
import styled from 'styled-components'
import { useApolloClient, useMutation } from '@apollo/client'
// Components
// Hooks & Lib
import useForm from '@/lib/useForm'
import useOnClickOutside from '@/lib/useOnClickOutside'
// GraphQL Queries & Mutations
import {
  ALL_BOARDS_QUERY,
  UPDATE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  CHANGE_TASK_ORDER_FROM_TASKGROUP_MUTATION,
} from '@/graphql/index'
// Generated TypeScript
import {
  board_board_taskGroups_tasks,
  board_board_taskGroups,
} from '@/generated/board'
import {
  changeTaskOrderFromTaskGroupMutation,
  changeTaskOrderFromTaskGroupMutationVariables,
} from '@/generated/changeTaskOrderFromTaskGroupMutation'

// End Imports

const IconEdit = styled.span`
  background-clip: padding-box;
  background-color: #f4f5f7;
  background-origin: initial;
  border-radius: 3px;
  opacity: 0.8;
  padding: 4px 6px;
  position: absolute;
  right: 4px;
  top: 6px;
  z-index: 40;
  visibility: hidden;

  :before {
    content: '✏️';
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    width: 20px;

    /* z-index: 40; */
  }

  :hover {
    background-color: #f7f7f8;
  }
`
const IconDelete = styled.span`
  background-clip: padding-box;
  background-color: #f4f5f7;
  background-origin: initial;
  border-radius: 3px;
  opacity: 0.8;
  padding: 4px 6px;
  position: absolute;
  right: 4px;
  top: 6px;
  z-index: 50;
  visibility: hidden;

  :before {
    content: '🗑️';
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    width: 20px;

    /* z-index: 40; */
  }

  &:hover {
    background-color: #eed2d2;
  }
`
const IconCancel = styled.span`
  background-clip: padding-box;
  background-color: #f4f5f7;
  background-origin: initial;
  border-radius: 3px;
  opacity: 0.8;
  padding: 4px 6px;
  position: absolute;
  right: 4px;
  top: 6px;
  z-index: 50;
  visibility: hidden;

  :before {
    content: '❌';
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    width: 20px;

    /* z-index: 40; */
  }

  &:hover {
    background-color: #eed2d2;
  }
`

const TaskStyles = styled.div`
  background-color: white;
  width: 100%;
  padding: 10px 20px;
  border-radius: 3px;
  box-shadow: 0 1px 0 #53535337;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  /* max-width: 300px; */
  min-height: 20px;
  position: relative;

  :hover {
    background-color: #e6e6e6;
  }
  &:hover ${IconEdit} {
    visibility: visible;
  }

  .task-name {
    display: block;
    max-width: 90%;
  }

  form,
  ${IconDelete} ${IconCancel} {
    display: none;
  }

  &.on-edit {
    border: 1px solid var(--mainBlue);
    background: var(--lightGrey);
    padding: 6px 20px;

    .task-name {
      display: none;
    }

    form,
    ${IconDelete}, ${IconCancel} {
      display: block;
    }

    input {
      width: 90%;
      border: none;
      background: var(--lightGrey);
      margin: 0;
      height: 28px;
    }

    & ${IconEdit} {
      visibility: hidden;
    }
    & ${IconDelete} {
      visibility: visible;
    }
  }
`

interface ITaskProps {
  task: board_board_taskGroups_tasks
  taskGroup?: board_board_taskGroups | null
}

interface IFormData {
  taskName: string
}

interface IForm {
  inputs: IFormData
  handleChange: (e: any) => void
  resetForm: () => void
  clearForm: () => void
}

const Task = ({ task, taskGroup = null }: ITaskProps) => {
  const apolloClient = useApolloClient()
  // Form Init
  const { inputs, resetForm, handleChange, clearForm }: IForm =
    useForm<IFormData>({
      taskName: task.name ?? '',
    })

  const [dragTask, setDragTask] = useState<number[] | null>(null)
  // Mutations : Update and Delete
  const [updateTask, { data, error, loading }] =
    useMutation(UPDATE_TASK_MUTATION)
  const [deleteTask, deleteTaskResult] = useMutation(DELETE_TASK_MUTATION)

  const [changeTaskOrder, resultChangeTaskOrder] = useMutation<
    changeTaskOrderFromTaskGroupMutation,
    changeTaskOrderFromTaskGroupMutationVariables
  >(CHANGE_TASK_ORDER_FROM_TASKGROUP_MUTATION)

  // Reference : Used to set focus and classes when edit
  const taskDiv = createRef<HTMLDivElement>()
  const taskInput = createRef<HTMLInputElement>()

  function handleClick() {
    taskDiv.current?.classList.add('on-edit')
    taskInput.current?.focus()
  }

  function stopEdit() {
    taskDiv.current?.classList.remove('on-edit')
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    stopEdit()
    await updateTask({ variables: { id: task.id, name: inputs.taskName } })
  }

  const handleClickOutside = async () => {
    stopEdit()
    if (inputs.taskName && inputs.taskName != '') {
      await updateTask({ variables: { id: task.id, name: inputs.taskName } })
    }
  }

  useOnClickOutside(taskDiv, handleClickOutside)
  async function handleDelete() {
    const confirmDelete = confirm(`Please confirm : Delete task "${task.name}"`)
    if (confirmDelete) {
      stopEdit()
      await deleteTask({
        variables: { id: task.id },
        refetchQueries: [{ query: ALL_BOARDS_QUERY }],
      })
    }
  }

  const dragStart = (e: DragEvent) => {
    const [taskGroupId, taskId] = e.currentTarget.id.split('|')
    e.dataTransfer.setData('drag-task-item-from', taskId)
    e.dataTransfer.setData('drag-taskGroup-item-from', taskGroupId)
  }

  const dragEnter = (e: DragEvent) => {
    const [taskGroupId, overElement] = e.currentTarget.id.split('|')

    const startElement = e.dataTransfer.getData('drag-task-item-from')

    apolloClient.cache.modify({
      id: `TaskGroup:${taskGroup?.id}`,
      fields: {
        tasks(taskRef: any[], { readField }) {
          const idStart = startElement.split(':')[1]
          const idCurrent = overElement.split(':')[1]
          // Find index of start Element
          const indexStart = taskRef.findIndex((ref) => {
            return readField('id', ref) == idStart
          })
          const indexCurrent = taskRef.findIndex((ref) => {
            return readField('id', ref) == idCurrent
          })

          const newArr = () => {
            if (indexStart === indexCurrent) {
              return taskRef
            }
            const movedItem = taskRef[indexStart]
            const remainingItems = taskRef.filter(
              (item, index) => index !== indexStart
            )
            const reorderedItems = [
              ...remainingItems.slice(0, indexCurrent),
              movedItem,
              ...remainingItems.slice(indexCurrent),
            ]
            return reorderedItems
          }
          const arr = newArr()
          setDragTask(arr)
          return arr
        },
      },
    })
  }

  const dragEnd = async (e: DragEvent) => {
    if (taskGroup?.id && dragTask) {
      const arr = dragTask.map((x: any) => {
        return Number(x.__ref.split(':')[1]) ?? null
      })

      // Mutation Change Task Order from a list of ordered IDs

      await changeTaskOrder({
        variables: { taskGroupId: taskGroup.id, taskIds: arr },
      })
      console.log('Order changed')
    }

    setDragTask(null)
  }

  const dragOver = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <TaskStyles
      ref={taskDiv}
      id={`TaskGroup:${taskGroup?.id}|Task:${task.id}`}
      onClick={handleClick}
      onDragEnter={dragEnter}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragOver={dragOver}
      draggable
    >
      <span className="task-name">{task.name}</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          ref={taskInput}
          value={inputs.taskName}
          onChange={handleChange}
        />
      </form>
      <IconEdit /> <IconDelete onClick={handleDelete} />
    </TaskStyles>
  )
}
export default Task
