// Imports :

// React & Packages
import { createRef, DragEvent, useState } from 'react'
import { StoreObject, useApolloClient, useMutation } from '@apollo/client'
import styled from 'styled-components'
// Components
import Task from './Task'
import { AddTaskButton } from './features/AddTaskButton'
import { TaskGroupTitle } from './features/TaskGroupTitle'
import { DeleteIcon } from '@/components/utils/Icons'
// Hooks & Lib
// GraphQL Queries & Mutations
import {
  ALL_BOARDS_QUERY,
  DELETE_TASKGROUP_MUTATION,
  CHANGE_TASK_ORDER_MUTATION,
  CHANGE_TASKGROUP_ORDER_MUTATION,
} from '@/graphql/index'
// Generated TypeScript
import { board_board_taskGroups, board_board } from '@/generated/board'
import { deleteTaskGroupMutation_deleteTaskGroup } from '@/generated/deleteTaskGroupMutation'
import {
  changeTaskGroupsOrderMutation,
  changeTaskGroupsOrderMutationVariables,
} from '@/generated/changeTaskGroupsOrderMutation'
import {
  changeTaskOrder,
  changeTaskOrderVariables,
} from '@/generated/changeTaskOrder'

// End Imports

export const TaskGroupStyles = styled.div`
  margin-right: 20px;

  flex-shrink: 0;

  /* width: auto; */
  padding: 10px 20px;
  border-radius: 3px;
  background-color: #f0f2f5;
  width: 272px;
  position: relative;
`

interface ITaskGroupProps {
  taskGroup: board_board_taskGroups
  board?: board_board | null
}

interface IFormData {
  taskName: string
  taskGroupName: string
}

interface IForm {
  inputs: IFormData
  handleChange: (e: any) => void
  resetForm: () => void
  // clearForm: () => void | null
}

interface IDragElementState {
  from: number
  to: number
}

interface IDragTaskState {
  fromGroupId: number | null
  fromGroupTasks: any[] | null
  toGroupId: number | null
  toGroupTasks: any[] | null
  movedTaskId: number
}

const generateTaskGroupArray = (
  indexStart: number,
  indexCurrent: number,
  taskGroupsRef: any[]
) => {
  if (indexStart === indexCurrent) {
    return taskGroupsRef
  }
  const movedItem = taskGroupsRef[indexStart]
  const remainingItems = taskGroupsRef.filter(
    (item, index) => index !== indexStart
  )

  const reorderedItems = [
    ...remainingItems.slice(0, indexCurrent),
    movedItem,
    ...remainingItems.slice(indexCurrent),
  ]

  return reorderedItems
}

const TaskGroup = ({ taskGroup, board = null }: ITaskGroupProps) => {
  const ref = createRef<HTMLDivElement>()

  const [dragTaskGroup, setDragTaskGroup] = useState<any | null>(null)
  const [dragTask, setDragTask] = useState<IDragTaskState | null>(null)

  // Mutations : Create Task and Delete Task Group
  const [deleteTaskGroup, resultDelete] =
    useMutation<deleteTaskGroupMutation_deleteTaskGroup>(
      DELETE_TASKGROUP_MUTATION
    )

  const [changeTaskGroupOrder, resultChangeTaskGroupOrder] = useMutation<
    changeTaskGroupsOrderMutation,
    changeTaskGroupsOrderMutationVariables
  >(CHANGE_TASKGROUP_ORDER_MUTATION)

  const [changeTaskOrder, resultChangeTaskOrder] = useMutation<
    changeTaskOrder,
    changeTaskOrderVariables
  >(CHANGE_TASK_ORDER_MUTATION)

  // Handle Click on Delete Task Group Button
  async function handleClickDelete() {
    const confirmDelete = confirm(
      `Please confirm : You will delete task group #${taskGroup.id} and all his tasks`
    )
    if (confirmDelete) {
      await deleteTaskGroup({
        variables: { id: taskGroup.id },
        refetchQueries: [{ query: ALL_BOARDS_QUERY }],
      }).catch((err) => console.log(err))
    }
  }

  // DRAG

  const apolloClient = useApolloClient()

  const updateTaskGroupCache = (startElement: string, overElement: string) => {
    apolloClient.cache.modify({
      id: `Board:${board?.id}`,
      fields: {
        taskGroups(taskGroupsRef: any[], { readField }) {
          const idStart = startElement.split(':')[1]
          const idCurrent = overElement.split(':')[1]
          // Find index of start Element
          const indexStart = taskGroupsRef.findIndex((ref) => {
            return readField('id', ref) == idStart
          })
          const indexCurrent = taskGroupsRef.findIndex((ref) => {
            return readField('id', ref) == idCurrent
          })

          const newArr = generateTaskGroupArray(
            indexStart,
            indexCurrent,
            taskGroupsRef
          )

          setDragTaskGroup(newArr)
          return newArr
        },
      },
    })
  }

  const identifyCurrentTaskGroupIdWithTaskIdFromCache = (
    boardId: number,
    taskId: number
  ) => {
    let taskGroupCurrentId = null
    apolloClient.cache.modify({
      id: `Board:${boardId}`, // TaskGroup :: remove the taskId
      fields: {
        taskGroups(tasksGroupRef: any[], { readField }) {
          // Find group of the current moved task Id
          const taskGroupIndex = tasksGroupRef.findIndex((ref) => {
            const tasks = readField('tasks', ref) as StoreObject[]
            return tasks.filter((x) => readField('id', x) == taskId).length > 0
          })

          taskGroupCurrentId = readField('id', tasksGroupRef[taskGroupIndex])
          return tasksGroupRef
        },
      },
    })
    return taskGroupCurrentId
  }

  const updateTaskCache = (
    taskGroupCurrentId: number,
    overElement: string,
    taskId: number
  ) => {
    let itemToMove: any | null = null
    let dragTaskState: IDragTaskState = {
      fromGroupId: null,
      fromGroupTasks: null,
      toGroupId: null,
      toGroupTasks: null,
      movedTaskId: 0,
    }
    dragTaskState.movedTaskId = taskId
    // Remove task from

    if (taskGroupCurrentId) {
      dragTaskState.fromGroupId = taskGroupCurrentId
      // Add task to
      apolloClient.cache.modify({
        id: `TaskGroup:${taskGroupCurrentId}`, // TaskGroup :: remove the taskId
        fields: {
          tasks(tasksRef: any[], { readField }) {
            const indexToDelete = tasksRef.findIndex(
              (ref) => readField('id', ref) === taskId
            )
            itemToMove = {
              position: indexToDelete,
              item: tasksRef[indexToDelete],
            }
            const arr = tasksRef.filter((_, index) => index !== indexToDelete)
            dragTaskState.fromGroupTasks = arr
            return arr
          },
        },
      })
      dragTaskState.toGroupId = parseInt(overElement.split(':')[1])
      // Add task to
      apolloClient.cache.modify({
        id: overElement, // TaskGroup :: remove the taskId
        fields: {
          tasks(tasksRef: any[], { readField }) {
            const arr = [
              ...tasksRef.slice(0, itemToMove.position),
              itemToMove.item,
              ...tasksRef.slice(itemToMove.position),
            ]
            dragTaskState.toGroupTasks = arr
            return arr
          },
        },
      })

      setDragTask(dragTaskState)
    }
  }

  //START
  const dragStart = (e: DragEvent) => {
    e.dataTransfer.setData('drag-item-from', e.currentTarget.id)
  }

  // ENTER
  const dragEnter = (e: DragEvent) => {
    // Task | TaskGroup
    const dragType =
      e.dataTransfer.getData('drag-task-item-from').split(':')[0] ||
      e.dataTransfer.getData('drag-item-from').split(':')[0]

    const overGroup = e.currentTarget.id

    const startGroup =
      dragType === 'TaskGroup'
        ? e.dataTransfer.getData('drag-item-from')
        : e.dataTransfer.getData('drag-taskGroup-item-from')

    if (dragType === 'TaskGroup') {
      updateTaskGroupCache(startGroup, overGroup)
    }
    if (dragType === 'Task' && board?.id) {
      const taskId = parseInt(
        e.dataTransfer.getData('drag-task-item-from').split(':')[1]
      )
      const groupIdOfDraggedTask =
        identifyCurrentTaskGroupIdWithTaskIdFromCache(board.id, taskId)
      if (groupIdOfDraggedTask) {
        if (overGroup.split(':')[1] != groupIdOfDraggedTask) {
          updateTaskCache(groupIdOfDraggedTask, overGroup, taskId)
        }
      }
    }
  }

  const dragEnd = async (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (board?.id && dragTaskGroup) {
      const arr = dragTaskGroup.map((x: any) => {
        return Number(x.__ref.split(':')[1]) ?? null
      })

      // Mutation Change TaskGroup Order from a list of ordered IDs
      // Handle Change in backend with PostgreSQL raw request ?
      await changeTaskGroupOrder({
        variables: { boardId: board?.id, taskGroupIds: arr },
      })
    }

    setDragTaskGroup(null)
  }

  const drop = async (e: DragEvent) => {
    if (board?.id && dragTask) {
      if (
        dragTask.fromGroupId &&
        dragTask.fromGroupTasks &&
        dragTask.toGroupId &&
        dragTask.toGroupTasks &&
        dragTask.movedTaskId
      ) {
        const fromTasksIds = dragTask.fromGroupTasks.map((x: any) => {
          return Number(x.__ref.split(':')[1]) ?? null
        })

        const toTasksIds: number[] = []

        apolloClient.cache.modify({
          id: `TaskGroup:${taskGroup.id}`,
          fields: {
            tasks(cachedTask, { readField }) {
              cachedTask.forEach((elem: StoreObject) => {
                if (elem !== undefined) {
                  const id = readField('id', elem)
                  if (id) {
                    toTasksIds.push(Number(id))
                  }
                }
              })
              return cachedTask
            },
          },
        })

        await changeTaskOrder({
          variables: {
            boardId: board.id,
            fromTaskGroupId: dragTask.fromGroupId,
            fromTasksArr: fromTasksIds,
            toTaskGroupId: dragTask.toGroupId,
            toTasksArr: toTasksIds,
            movedTaskId: dragTask.movedTaskId,
          },
        })
        setDragTask(null)
      }
    }
  }

  const dragOver = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <TaskGroupStyles
      ref={ref}
      onDragEnter={dragEnter}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDropCapture={drop}
      onDragOver={dragOver}
      id={`TaskGroup:${taskGroup.id}`}
      draggable
    >
      <DeleteIcon onClick={handleClickDelete} />
      <TaskGroupTitle
        taskGroupId={taskGroup.id}
        taskGroupName={taskGroup.name ?? ''}
      />
      {taskGroup.tasks?.map((task) => {
        if (!task) return null
        return <Task key={task.id} task={task} taskGroup={taskGroup} />
      })}

      <AddTaskButton taskGroupId={taskGroup.id} boardId={board?.id ?? null} />
    </TaskGroupStyles>
  )
}
export default TaskGroup
