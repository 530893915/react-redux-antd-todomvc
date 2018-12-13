import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, COMPLETE_TODO_ITEM, INIT_LIST_ACTION, GET_ALL, SET_FILTER, GET_ALL_CHANGE } from './actionTypes'

// list结构：
// {
//   value: xxxx,
//   index: xxxx,
//   is_completed: xxxx
// }

const defaultState = {
  inputValue: '',
  list: [],
  ajaxList: [],
  filters: GET_ALL,
  allChange: false
};

// reducer可以接受state，但绝不能修改state
export default (state = defaultState, action) => {
  if(action.type === CHANGE_INPUT_VALUE) {
    // 对上一次的state做一次深拷贝，newState
    const newState = JSON.parse(JSON.stringify(state));
    // 更新数据后返回最新的state
    newState.inputValue = action.value;
    return newState;
  }
  if(action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));

    if(!state.inputValue.length) {
      return newState;
    }
    
    newState.list = [...newState.list,
      {
        value: newState.inputValue,
        itemID: newState.list.length + Math.random(),
        complete: false 
      }
    ];
    newState.inputValue = '';

    // 当全部勾选，全选按钮也勾上
    let allLength = 0;
    for(var i = 0; i < newState.list.length; i++) {
      if(newState.list[i].complete) {
        allLength++;
      }
    }
    if(allLength === newState.list.length) {
      newState.allChange = true;
    }else{
      newState.allChange = false;
    }
    return newState;
  }
  if(action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    let newList = [];
    for(let i = 0; i < newState.list.length; i++) {
      if(newState.list[i].itemID !== action.value) {
        newList.push(newState.list[i]);
      }
    }
    newState.list = newList;
    if(newState.list.length === 0) {
      newState.allChange = false;
    }
    return newState;
  }
  // 勾选完成
  if(action.type === COMPLETE_TODO_ITEM) {
    let allLength = 0;
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.map((item) => {
      if(item.itemID === action.value) {
        if(item.complete) {item.complete=false} else {item.complete=true}
        return item;
      }
      return item;
    })
    // 当全部勾选，全选按钮也勾上
    for(let i = 0; i < newState.list.length; i++) {
      if(newState.list[i].complete) {
        allLength++;
      }
    }
    if(allLength === newState.list.length) {
      newState.allChange = true;
    }else{
      newState.allChange = false;
    }
    return newState;
  }
  // ajax
  if(action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.ajaxList = action.data;
    return newState;
  }
  // 按钮过滤
  if(action.type === SET_FILTER) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.filters = action.filter;
    return newState;
  }
  // 全选
  if(action.type === GET_ALL_CHANGE) {
    const newState = JSON.parse(JSON.stringify(state));
    if(newState.list.length === 0) {
      return newState;
    }
    if(newState.allChange) {newState.allChange=false} else {newState.allChange=true};
    newState.list.map((item) => {
      if(newState.allChange) {
        item.complete = true;
      } else {
        item.complete = false;
      }
      return item;
    })
    return newState;
  }
  return state;
};