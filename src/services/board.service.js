import { storageService } from './async-storage.service.js'

const imageLinks = [
  'https://images.pexels.com/photos/30061809/pexels-photo-30061809/free-photo-of-fashionable-woman-posing-with-colorful-headscarf.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30007901/pexels-photo-30007901/free-photo-of-thoughtful-man-in-grey-coat-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/28773362/pexels-photo-28773362/free-photo-of-dynamic-black-and-white-portrait-of-young-man-on-phone.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30071289/pexels-photo-30071289/free-photo-of-portrait-of-a-bearded-man-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600',
]

const STORAGE_KEY = 'boards'

export const boardService = {
  query,
  getById,
  remove,
  save,
  addGroupToBoard,
  makeFirstBoard,
  addItemToGroup,
  removeGroupFromBoard,
  removeTaskFromGroup,
  updateTaskInGroup,
}

async function query() {
  try {
    let boards = await storageService.query(STORAGE_KEY)
    if (!boards || boards.length === 0) {
      await makeFirstBoard()
      boards = await storageService.query(STORAGE_KEY)
    }
    return boards
  } catch (error) {
    console.log('Error:', error)
    throw error
  }
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

async function save(boardToSave) {
  if (boardToSave._id) {
    return storageService.put(STORAGE_KEY, boardToSave)
  } else {
    return storageService.post(STORAGE_KEY, boardToSave)
  }
}

async function addGroupToBoard(boardId, newGroup) {
  try {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')

    newGroup.id = `group${Date.now()}`
    board.groups.push(newGroup)

    await save(board)

    console.log('Group added successfully:', newGroup)
    return newGroup
  } catch (error) {
    console.error('Error adding group to board:', error)
    throw error
  }
}

async function addItemToGroup(boardId, groupId, newItem) {
  const board = await getById(boardId)
  if (!board) throw new Error('Board not found')

  const groupIndex = board.groups.findIndex((group) => group.id === groupId)
  if (groupIndex === -1) throw new Error('Group not found')

  board.groups[groupIndex].tasks.push(newItem)
  await save(board)
}

async function removeGroupFromBoard(boardId, groupId) {
  const board = await getById(boardId)
  if (!board) throw new Error('Board not found')

  board.groups = board.groups.filter((group) => group.id !== groupId)
  await save(board)
}

async function removeTaskFromGroup(boardId, groupId, taskId) {
  try {
    const board = await getById(boardId)
    if (!board) throw new Error('Board not found')

    const group = board.groups.find((group) => group.id === groupId)
    if (!group) throw new Error('Group not found')

    group.tasks = group.tasks.filter((task) => task.id !== taskId)

    await save(board)

    console.log('Task removed from group and local storage')
  } catch (error) {
    console.error('Error removing task:', error)
    throw error
  }
}

async function updateTaskInGroup(boardId, groupId, taskId, updatedTask) {
  try {
    const board = await getById(boardId) // Call directly without 'this'
    const group = board.groups.find((group) => group.id === groupId)
    if (!group) throw new Error('Group not found')

    const taskIndex = group.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1) throw new Error('Task not found')

    group.tasks[taskIndex] = { ...group.tasks[taskIndex], ...updatedTask }

    await save(board) // Call directly without 'this'

    return group.tasks[taskIndex]
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

makeFirstBoard()

async function makeFirstBoard() {
  const boards = {
    _id: 'b01',
    title: 'SAR default board',
    groups: [
      {
        id: 'group1',
        title: 'SAR',
        color: 'red',
        tasks: [
          {
            id: 't102',
            side: 'null',
            taskTitle: 'learn Vue.js',
            members: [
              { id: 'user3', name: 'tal', color: 'red', image: imageLinks[0] },
              {
                id: 'user4',
                name: 'bal',
                color: 'black',
                image: imageLinks[1],
              },
              {
                id: 'user5',
                name: 'shal',
                color: 'blue',
                image: imageLinks[2],
              },
            ],
          },
          {
            id: 't103',
            side: 'null',
            taskTitle: 'study JavaScript',
            members: [
              {
                id: 'user1',
                name: 'Mohan',
                color: 'green',
                image: imageLinks[3],
              },
            ],
          },
        ],
      },
    ],
  }

  const boardsFromStorage = await storageService.query(STORAGE_KEY)
  if (!boardsFromStorage || boardsFromStorage.length === 0) {
    await storageService.post(STORAGE_KEY, boards)
    console.log('First board created successfully')
  }
}
