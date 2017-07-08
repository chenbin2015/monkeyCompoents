import { combineReducers } from 'redux'
import demo from './demo'
import student from './student'

const todoApp = combineReducers({
  demo,
  student
})

export default todoApp