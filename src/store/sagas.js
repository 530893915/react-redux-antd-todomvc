import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes';
import axios from 'axios';
import { initListAction } from './actionCreators';

function* getInitList() {
  try {
    const res = yield axios.get('/todolist.json');
    const action = initListAction(res.data);
    yield put(action);
  }catch(e) {
    console.log('error');
  }
}

function* todoSaga() {
  yield takeEvery(GET_INIT_LIST, getInitList)
}

export default todoSaga;