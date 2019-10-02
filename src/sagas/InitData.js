import _ from 'lodash';
import { put, call, delay } from 'redux-saga/effects';
import { fetchRecommendedAppsIds, fetchAppsData, fetch100AppsId } from '../dao/AppsDao';
import {
    SITE_CONFIG_LOADING,
    RECOMMENDED_APPS_INITIALIZING,
    RECOMMENDED_APPS_INITIALIZED,
    GET_RECOMMENDED_APPS,
    APP_RESULT_INITIALIZING,
    APP_LIST_GET_FIRST_TEN_APPS,
    APP_RESULT_INITIALIZED,
    SITE_CONFIG_LOADED,
    ERROR
} from '../actionTypes';

export default function* initData() {
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