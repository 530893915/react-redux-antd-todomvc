import React, { Component } from 'react';
import store from './store';
import { getInputChangeAction, getButtonClickAction, getItemDeleteAction, getItemCheckedAction, getInitList, getAll, getComplete, getActive, getAllChange } from './store/actionCreators';
import TodoListUI from './TodoListUI';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleAllChange = this.handleAllChange.bind(this);

    // 当store数据发生改变时触发
    store.subscribe(this.handleStoreChange);
  }

  handleInputChange(e) {
    // 创建一个action
    const action = getInputChangeAction(e.target.value)
    // 通过dispatch方法将action传给store
    store.dispatch(action);
  }

  handleButtonClick() {
    const action = getButtonClickAction();
    store.dispatch(action);
  }

  handleItemDelete(index) {
    const action = getItemDeleteAction(index);
    store.dispatch(action);
  }

  // 勾选ListItem
  handleBoxChecked(index) {
    const action = getItemCheckedAction(index);
    store.dispatch(action);
  }

  // 过滤按钮
  // 全部
  handleAll() {
    const action = getAll();
    store.dispatch(action);
  }

  // 已完成
  handleComplete() {
    const action = getComplete();
    store.dispatch(action);
  }

  // 未完成
  handleActive() {
    const action = getActive();
    store.dispatch(action);
  }

  // 全部完成/不完成
  handleAllChange() {
    const action = getAllChange();
    store.dispatch(action);
  }

  // 组件从store里拿到新的数据并更新
  handleStoreChange() {
    this.setState(store.getState());
  }

  render() {
    return (
      <TodoListUI 
        inputValue={this.state.inputValue}
        ajaxList={this.state.ajaxList}
        handleInputChange={this.handleInputChange}
        handleButtonClick={this.handleButtonClick}
        allChange={this.state.allChange}
        filters={this.state.filters}
        list={this.state.list}
        handleAll={this.handleAll}
        handleComplete={this.handleComplete}
        handleActive={this.handleActive}
        boxChecked={this.state.boxChecked}
        handleBoxChecked={this.handleBoxChecked}
        handleItemDelete={this.handleItemDelete}
        handleAllChange={this.handleAllChange}/>
    )
  }

  // componentDidMount() {
  //   // 使用redux-thunk后，action可以返回一个函数，并通过dispatch方法发送给store
  //   const action = getTodoList();
  //   store.dispatch(action);
  // }

  componentDidMount() {
    const action = getInitList();
    store.dispatch(action);
  }
}

export default TodoList;
