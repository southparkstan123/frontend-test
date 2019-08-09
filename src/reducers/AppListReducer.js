// @flow
import _ from "lodash";

import type { 
    AppListState, 
    AppItemObj,
    ShowNextTenItemsAction,
    GetFirstTenAppsAction,
    SearchResultAction
} from "../types";

import { 
    APP_LIST_GET_FIRST_TEN_APPS,
    SEARCH_RESULT_BY_KEYWORD,
    APP_LIST_SHOW_NEXT_TEN_ITEMS,
    APP_RESULT_LOADING,
    APP_RESULT_LOADED,
    APP_RESULT_SEARCHING,
    APP_RESULT_SEARCHED
} from '../actionTypes';

const initialState: AppListState = {
    appListIds: [],
    filteredAppList: [],
    hasMoreItems: false,
    isAppLoading: false,
    appListToBeSearch: [],
    isAppSearching: false
}

export default function AppListReducer(state: AppListState = initialState, action: SearchResultAction | GetFirstTenAppsAction | ShowNextTenItemsAction): AppListState{
    switch(action.type){
    case APP_LIST_GET_FIRST_TEN_APPS:
        let list: Array<Array<string>> = _.chain(action).get('data.hunderAppsIds', []).value();
        const filteredAppList: Array<AppItemObj> = _.chain(action).get('data.first10FreeAppsResult', []).value();
        list.shift();

        return {
            ...state,
            appListIds: list,
            filteredAppList,
            hasMoreItems: true,
            appListToBeSearch: filteredAppList
        }
    case SEARCH_RESULT_BY_KEYWORD:
        const data: Array<AppItemObj> = _.get(action, 'data',[])

        state.appListIds = _.chain(data).map(item => item.appId).chunk(10).value();
        state.filteredAppList = _.chain(data).chunk(10).first().value();
        state.appListIds.shift();

        return { 
            ...state,
            hasMoreItems: !_.isEmpty(state.appListIds)
        }
    case APP_LIST_SHOW_NEXT_TEN_ITEMS:
        if(state.hasMoreItems){
            const next10Apps: Array<AppItemObj> = action.data;
            state.filteredAppList = state.filteredAppList.concat(next10Apps);
            state.appListToBeSearch = state.filteredAppList.concat(next10Apps);
            state.appListIds.shift();
        }

        return {
            ...state,
            hasMoreItems: !_.isEmpty(state.appListIds)
        }
    case APP_RESULT_LOADING:
        return {
            ...state,
            isAppLoading: true
        }
    case APP_RESULT_LOADED:
        return {
            ...state,
            isAppLoading: false,
            hasMoreItems: !_.isEmpty(state.appListIds)
        }
    case APP_RESULT_SEARCHING:
        return {
            ...state,
            isAppSearching: true
        }
    case APP_RESULT_SEARCHED:
        return {
            ...state,
            isAppSearching: false,
            hasMoreItems: !_.isEmpty(state.appListIds)
        }
    default:
        return state;
    }
}