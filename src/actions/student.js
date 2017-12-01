import { SET_NAME } from '../actionsType/student'

export function setName(name) {
  return async (dispatch, getState) => {
    var s = await fetch('http://st.haiziwang.com/data/front/detail-city-store.json')
    var ss = await s.json()
    dispatch({
      type: SET_NAME,
      payload: name
    })
  }
}