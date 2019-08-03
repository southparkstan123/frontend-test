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
    appList: [],
    filteredAppList: [],
    hasMoreItems: false,
    isSearching: false,
    appListToBeSearch: []
}

export default function AppListReducer(state: AppListState = initialState, action: SearchResultAction | GetFirstTenAppsAction | ShowNextTenItemsAction): AppListState{
    switch(action.type){
    case APP_LIST_GET_FIRST_TEN_APPS:
        let list: Array<Array<AppItemObj>> = _.chain(action).get('data', []).chunk(10).value();
        const filteredAppList: Array<AppItemObj> = _.first(list);
        list.shift();

        return {
            ...state,
            appList: list,
            filteredAppList,
            hasMoreItems: true,
            appListToBeSearch: _.chain(action).get('data', []).value()
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

        state.appList = _list
        state.filteredAppList = _.first(_list)
        state.appList.shift();

        return { 
            ...state
        }
    case APP_LIST_SHOW_NEXT_TEN_ITEMS:
        if(state.hasMoreItems){
            const next10Apps: Array<AppItemObj> = _.first(state.appList);
            state.filteredAppList = state.filteredAppList.concat(next10Apps);
            state.appList.shift();
        }

        return {
            ...state,
            hasMoreItems: !_.isEmpty(state.appList)
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
            hasMoreItems: !_.isEmpty(state.appList)
        }
    default:
        return state;
    }
}