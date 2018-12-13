import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, COMPLETE_TODO_ITEM, INIT_LIST_ACTION, GET_INIT_LIST, SET_FILTER, GET_ALL, GET_COMPLETE, GET_ACTIVE, GET_ALL_CHANGE } from './actionTypes'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const getButtonClickAction = () => ({
  type: ADD_TODO_ITEM
});

export const getItemDeleteAction = (value) => ({
  type: DELETE_TODO_ITEM,
  value
});

export const getItemCheckedAction = (value) => ({
  type: COMPLETE_TODO_ITEM,
  value
});

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
});

// // 安装redux-thunk后，即可在actionCreators中进行异步请求
// // 当调用action 返回内容为函数时，函数能够接收到dispatch
// export const getTodoList = () => {
//   return (dispatch) => {
//     axios.get('/todolist.json')
//     .then((res) => {
//       const data = res.data;
//       // 在actionCreators中直接调用里面的方法就行了
//       const action = initListAction(data);
//       dispatch(action);
//     })
//     .catch(() => {console.log('fail')})
//   }
// }

export const getInitList = () => ({
  type: GET_INIT_LIST
});

export const getAll = () => ({
  type: SET_FILTER,
  filter: GET_ALL
});

export const getComplete = () => ({
  type: SET_FILTER,
  filter: GET_COMPLETE
});

export const getActive = () => ({
  type: SET_FILTER,
  filter: GET_ACTIVE
});

export const getAllChange = (value) => ({
  type: GET_ALL_CHANGE,
  value
})