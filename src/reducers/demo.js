import Immutable from 'seamless-immutable'

import { REQUEST_START, REQUEST_END, GET_LIST } from '../actionsType'

let initialState = Immutable({
  isFetching: false,
  dataList: [],
  pageIndex: 1
})
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_START:
      return Immutable.merge(state, { isFetching: true })
    case REQUEST_END:
      return Immutable.merge(state, { isFetching: false })
    case GET_LIST:
      state = Immutable.update(state, 'dataList', (dataList, payload) => dataList.concat(payload), action.payload)
      return Immutable.update(state, 'pageIndex', (pageIndex, step) => pageIndex + step, 1)
    default:
      return state
  }
}
