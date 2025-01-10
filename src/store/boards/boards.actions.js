import { boardService } from '../../services/Board.service'
import { showSuccessMsg } from '../../services/event-bus.service'
import { utilService } from '../../services/util.service'
import { store } from '../store'

import { EDIT_BOARD, SET_BOARDS } from './boards.reducer'

export async function loadBoards() {
  const boards = await boardService.query()
  await store.dispatch({ type: SET_BOARDS, boards })
  showSuccessMsg('Boards loaded')
}

export async function addGroup(boardId, groupTitle) {
  const newGroup = {
    id: utilService.makeId(),
    title: groupTitle,
    color: utilService.getRandomColor(),
    tasks: [],
  }

  await boardService.addGroupToBoard(boardId, newGroup)

  const board = await boardService.getById(boardId)
  if (!board) return

  await store.dispatch({
    type: EDIT_BOARD,
    boardId,
    updatedBoard: board,
  })

  showSuccessMsg('Group added successfully')
}

export async function addItem(boardId, groupId, itemTitle) {
  const newItem = {
    id: utilService.makeId(),
    taskTitle: itemTitle,
    members: [],
    date: new Date().toISOString(),
    status: 'IN PROGRESS',
    priority: 'LOW',
  }

  await boardService.addItemToGroup(boardId, groupId, newItem)

  const board = await boardService.getById(boardId)
  if (!board) return

  const updatedBoard = {
    ...board,
    groups: board.groups.map((group) =>
      group.id === groupId ? { ...group, tasks: [...group.tasks] } : group
    ),
  }

  await store.dispatch({
    type: EDIT_BOARD,
    boardId,
    updatedBoard,
  })

  showSuccessMsg('Item added successfully')
}

export async function removeGroup(boardId, groupId) {
  await boardService.removeGroupFromBoard(boardId, groupId)

  const board = await boardService.getById(boardId)
  if (!board) throw new Error('Board not found')

  const updatedBoard = {
    ...board,
    groups: board.groups.filter((group) => group.id !== groupId),
  }

  await store.dispatch({
    type: EDIT_BOARD,
    boardId,
    updatedBoard,
  })

  showSuccessMsg('Group removed successfully')
}

export async function removeTask(boardId, groupId, taskId) {
  await boardService.removeTaskFromGroup(boardId, groupId, taskId)

  const board = await boardService.getById(boardId)
  if (!board) return

  const updatedBoard = {
    ...board,
    groups: board.groups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            tasks: group.tasks.filter((task) => task.id !== taskId),
          }
        : group
    ),
  }

  await store.dispatch({
    type: EDIT_BOARD,
    boardId,
    updatedBoard,
  })

  showSuccessMsg('Task removed successfully')
}

export async function updateTask(boardId, groupId, taskId, updatedTask) {
  await boardService.updateTaskInGroup(boardId, groupId, taskId, updatedTask)

  const board = await boardService.getById(boardId)
  if (!board) return

  const updatedBoard = {
    ...board,
    groups: board.groups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            tasks: group.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updatedTask } : task
            ),
          }
        : group
    ),
  }

  await store.dispatch({
    type: EDIT_BOARD,
    boardId,
    updatedBoard,
  })

  showSuccessMsg('Task updated successfully')
}
