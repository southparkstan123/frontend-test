import { takeLatest } from 'redux-saga/effects';

import initData from './InitData';
import loadNext10Apps from './LoadNext10Apps';
import searchAppsByKeyword from './SearchAppsByKeyword';

import { 
    LOAD_ALL_DATA,
    LOAD_NEXT_10_APPS,
    SEARCHING_APPS
} from '../actionTypes';

export default function* rootSaga(){
    yield takeLatest(LOAD_ALL_DATA, initData);
    yield takeLatest(LOAD_NEXT_10_APPS, loadNext10Apps);
    yield takeLatest(SEARCHING_APPS, searchAppsByKeyword);
}