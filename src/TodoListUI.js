import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List, Checkbox } from 'antd';
import './style.css'
import { GET_COMPLETE, GET_ACTIVE } from './store/actionTypes'


class TodoListUI extends Component {

  render() {

    let todos = this.props.list;
    let activeNum = 0;
    let completeNum = 0;
    activeNum = todos.filter((item) => {
      return item.complete === false;
    }).length;
    completeNum = this.props.list.length - activeNum;
    todos = this.props.list;
    
    switch(this.props.filters) {
      case GET_ACTIVE:
        todos = todos.filter((item) => {
          return item.complete === false;
        })
        break;
      case GET_COMPLETE:
        todos = todos.filter((item) => {
          return item.complete === true;
        })
        break;
      default: 
    }
    
    
    

    return (
  
      <div style={{marginTop: 10, marginLeft: 10}}>
        <div>
          <Input 
            value={this.props.inputValue}
            placeholder='TodoInfo' 
            style={{width: 300, marginRight: 10}}
            onChange={this.props.handleInputChange} 
          />
          <Button 
            type='primary'
            onClick={this.props.handleButtonClick}
          >添加计划</Button>
        </div>
        <List 
          style={{width: 400, marginTop: 10}}
          bordered
          dataSource={todos}
          header={<div style={{textAlign: "center"}}>
            <Checkbox 
              style={{float: "left"}}
              checked={this.props.allChange ? true : false}
              onChange={this.props.handleAllChange}
            />共{this.props.list.length}条计划,已完成{completeNum}项,待完成{activeNum}项</div>}
          footer={
            <div>
              <Button
                className='filter' 
                onClick={this.props.handleAll}>所有计划</Button>
              <Button
                className='filter' 
                onClick={this.props.handleComplete}>已完成</Button>
              <Button
                className='filter' 
                onClick={this.props.handleActive}>未完成</Button>
            </div>
          }
          renderItem={(item, index) => (
            <List.Item 
              key={index} 
              className={item.complete ? 'checked' : 'nochecked'}> 

                <Checkbox
                  className='checkbox' 
                  checked={item.complete ? true : false}
                  onChange={this.props.handleBoxChecked.bind(this, item.itemID)}
                />
                {item.value}
                <Button 
                  type="danger"
                  size={"small"}
                  className="deleteBtn"
                  onClick={() => {this.props.handleItemDelete(item.itemID)}}
                >删除</Button>

            </List.Item>
          )} />
        
        

        {/* <List
          style={{width: 400, marginTop: 10}}
          bordered
          dataSource={props.ajaxList}
          header={<div style={{textAlign: "center"}}>下面是axios获取的数据:</div>}
          renderItem={(item, index) => (
            <List.Item 
              key={item} 
            >{item}</List.Item>
          )}
        /> */}
      </div>
    )
  }
}

export default TodoListUI;