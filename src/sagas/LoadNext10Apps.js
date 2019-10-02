import { put, call } from 'redux-saga/effects';
import { fetchAppsData } from '../dao/AppsDao';
import {
    APP_RESULT_LOADING,
    APP_LIST_SHOW_NEXT_TEN_ITEMS,
    APP_RESULT_LOADED,
    ERROR
} from '../actionTypes';

export default function* loadNext10Apps ({ ids }) {
    yield put({ type: APP_RESULT_LOADING });
    try {
        const result: Array<string> = yield call(fetchAppsData, ids);
        yield put({ type: APP_LIST_SHOW_NEXT_TEN_ITEMS , data: result })
        yield put({ type: APP_RESULT_LOADED });
    } catch (error) {
        yield put({ type: ERROR, error });
    }
}