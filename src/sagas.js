import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { fetch100AppsId, fetchRecommendedAppsIds, fetchAppsData, searchApp } from './dao/AppsDao';
import { 
    LOAD_ALL_DATA,
    RECOMMENDED_APPS_INITIALIZING,
    RECOMMENDED_APPS_INITIALIZED,
    APP_RESULT_INITIALIZING,
    APP_RESULT_INITIALIZED,
    APP_LIST_GET_FIRST_TEN_APPS,
    GET_RECOMMENDED_APPS,
    SITE_CONFIG_LOADING,
    SITE_CONFIG_LOADED,
    APP_LIST_SHOW_NEXT_TEN_ITEMS,
    APP_RESULT_LOADING,
    APP_RESULT_LOADED,
    LOAD_NEXT_10_APPS,
    APP_RESULT_SEARCHING,
    SEARCH_RESULT_BY_KEYWORD,
    APP_RESULT_SEARCHED,
    SEARCHING_APPS,
    ERROR
} from './actionTypes';
import _ from 'lodash';

export default function* rootSaga(){
    yield takeLatest(LOAD_ALL_DATA, initData);
    yield takeLatest(LOAD_NEXT_10_APPS, loadNext10Apps);
    yield takeLatest(SEARCHING_APPS, searchAppsByKeyword);
}

function* searchAppsByKeyword ({ keyword }) {
    yield put({ type: APP_RESULT_SEARCHING });
    try {
        const data: Array<string> = yield call(searchApp, keyword);
        yield put({ type: SEARCH_RESULT_BY_KEYWORD, data })
        yield put({ type: APP_RESULT_SEARCHED });
    } catch (error) {
        yield put({ type: ERROR, error });
    }
}

function* loadNext10Apps ({ ids }) {
    yield put({ type: APP_RESULT_LOADING });
    try {
        const result: Array<string> = yield call(fetchAppsData, ids);
        yield put({ type: APP_LIST_SHOW_NEXT_TEN_ITEMS , data: result })
        yield put({ type: APP_RESULT_LOADED });
    } catch (error) {
        yield put({ type: ERROR, error });
    }
}

function* initData() {
    yield put({ type: SITE_CONFIG_LOADING });
    try {
        // Fetch the ids of recommended apps their data
        yield put({ type: RECOMMENDED_APPS_INITIALIZING });
        const recommendedAppsIds: Array<string> = yield call(fetchRecommendedAppsIds);
        const recomendedAppsResult = yield call(fetchAppsData, recommendedAppsIds)
        yield put({ type: RECOMMENDED_APPS_INITIALIZED });
        yield put({ type: GET_RECOMMENDED_APPS, data: recomendedAppsResult });
        yield delay(100);

        // Fetch the ids of 100 apps and first 10 apps data
        yield put({ type: APP_RESULT_INITIALIZING });
        const hunderAppsIds = yield call(fetch100AppsId);
        const firstTenAppsIds: Array<string> = _.first(hunderAppsIds);
        const first10FreeAppsResult = yield call(fetchAppsData, firstTenAppsIds)
        yield put({ type: APP_LIST_GET_FIRST_TEN_APPS, data: { hunderAppsIds, first10FreeAppsResult } });
        yield put({ type: APP_RESULT_INITIALIZED });
        yield delay(100);
    } catch (error) {
        yield put({ type: ERROR, error });
    } finally {
        yield put({ type: SITE_CONFIG_LOADED });
    }
}