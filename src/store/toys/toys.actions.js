import { showErrorMsg } from '../../services/event-bus.service'
import { toyService } from '../../services/toys.service'
import { store } from '../store'

import {
  ADD_TOY,
  EDIT_TOY,
  REMOVE_TOY,
  SET_FILTER,
  //   SET_IS_LOADING,
  SET_TOYS,
} from './toys.reducer'

export async function loadToys(filterBy) {
  try {
    const toys = await toyService.query(filterBy)
    await store.dispatch({ type: SET_TOYS, toys })
    console.log(toys, ' from action now')
  } catch (err) {
    console.log('Having issues with loading toys:', err)
    showErrorMsg('Having issues with loading toys:')
    throw err
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log('Having issues removing toy:', err)
    throw err
  }
}

// export async function removeRobotOptimistic(robotId) {
//   try {
//     store.dispatch({ type: REMOVE_TOY, robotId })
//     await toyService.remove(robotId)
//   } catch (err) {
//     console.log('Having issues removing robot:', err)
//     store.dispatch({ type: UNDO_CHANGES })
//     throw err
//   }
// }

export async function saveToy(toyToSave) {
  try {
    const type = toyToSave.id ? EDIT_TOY : ADD_TOY
    const toy = await toyService.save(toyToSave)
    store.dispatch({ type, toy })
  } catch (err) {
    console.log('Having issues saving toy:', err)
    throw err
  }
}

export function setFilterBy(filterBy = {}) {
  store.dispatch({ type: SET_FILTER, filterBy })
}
