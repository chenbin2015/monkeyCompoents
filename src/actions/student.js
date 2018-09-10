import { SET_NAME } from '../actionsType/student'

export function setName(name) {
  return async (dispatch, getState) => {
    var s = await fetch('..')
    var ss = await s.json()
    dispatch({
      type: SET_NAME,
      payload: name
    })
  }
}
