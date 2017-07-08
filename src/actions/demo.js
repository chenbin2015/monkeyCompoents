import fetch from '../common/js/fetch'
import { REQUEST_START, REQUEST_END, GET_LIST } from '../actionsType'

export function getList(pageIndex) {
  return async(dispatch, getState) => {
    try {
      dispatch({
        type: REQUEST_START
      })
      let response = await fetch(`http://localhost:4000/getList/${pageIndex}`)
      let json = await response.json()
      if (json && json.data) {
        dispatch({
          type: REQUEST_END
        })
        return dispatch({
          type: GET_LIST,
          payload: json.data
        })
      }
    } catch (e) {
      dispatch({
        type: REQUEST_END
      })
      console.log(e)
    }
  }
}
