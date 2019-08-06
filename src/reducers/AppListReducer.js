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
    SEARCH_RESULT_LOADING,
    SEARCH_RESULT_LOADED
} from '../actionTypes';

import { isMatchResult } from '../utils';

const initialState: AppListState = {
    appListIds: [],
    filteredAppList: [],
    hasMoreItems: false,
    isSearching: false,
    appListToBeSearch: []
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
        let _list: Array<Array<AppItemObj>> = [];

        const keyword: string = _.get(action, 'keyword','')
        
        if (keyword !== '') {
            const result: Array<AppItemObj> = _.chain(state)
                .get('appListToBeSearch', [])
                .filter((item: AppItemObj) => isMatchResult(item, ['name', 'category', 'summary', 'artistName'], keyword))
                .value();
            _list = _.chain(result).chunk(10).value();
        } else {
            _list = _.chain(state).get('appListToBeSearch', []).chunk(10).value();
        }

        state.appListIds = _list
        state.filteredAppList = _.first(_list)
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
    case SEARCH_RESULT_LOADING:
        return {
            ...state,
            isSearching: true
        }
    case SEARCH_RESULT_LOADED:
        return {
            ...state,
            isSearching: false,
            hasMoreItems: !_.isEmpty(state.appListIds)
        }
    default:
        return state;
    }
}