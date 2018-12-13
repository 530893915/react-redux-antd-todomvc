import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';
import todoSagas from './sagas'

// 使用多个redux中间件时，redux浏览器调试器的配置方法（这里使用了redux-thunk和redux-devtools两个中间件）
// const composeEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(thunk)
// );
// -------------------------------------------


// 创建一个saga中间件
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

const store = createStore(
  reducer, 
  enhancer
);

// 执行sagas
sagaMiddleware.run(todoSagas);

export default store;