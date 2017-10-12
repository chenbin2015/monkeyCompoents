import { SET_NAME } from '../actionsType/student'
export default (state = { name: '陈斌' }, action) => {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, { name: action.payload })
    default:
      return state
  }
}
