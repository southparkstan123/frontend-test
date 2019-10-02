import { put, call } from 'redux-saga/effects';
import { searchApp } from '../dao/AppsDao';
import {
    APP_RESULT_SEARCHING,
    SEARCH_RESULT_BY_KEYWORD,
    APP_RESULT_SEARCHED,
    ERROR
} from '../actionTypes';

export default function* searchAppsByKeyword ({ keyword }) {
    yield put({ type: APP_RESULT_SEARCHING });
    try {
        const data: Array<string> = yield call(searchApp, keyword);
        yield put({ type: SEARCH_RESULT_BY_KEYWORD, data })
        yield put({ type: APP_RESULT_SEARCHED });
    } catch (error) {
        yield put({ type: ERROR, error });
    }
}