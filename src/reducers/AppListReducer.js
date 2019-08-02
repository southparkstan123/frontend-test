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
    APP_LIST_SHOW_NEXT_TEN_ITEMS
} from '../actionTypes';

import { isMatchResult } from '../utils';

const initialState: AppListState = {
    appList: [],
    filteredAppList: [],
    hasMoreItems: false
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
            hasMoreItems: true
        }
    case SEARCH_RESULT_BY_KEYWORD:
        state.hasMoreItems = (state.appList.length === 0);

        let _list: Array<Array<AppItemObj>> = [];

        const keyword: string = _.get(action, 'keyword','')

        if (keyword !== '') {
            const result: Array<AppItemObj> = _.chain(action)
                .get('data', [])
                .filter((item: AppItemObj) => isMatchResult(item, ['name', 'category', 'summary', 'artistName'], keyword))
                .value();

            _list = _.chain(result).chunk(10).value();
        } else {
            _list = _.chain(action).get('data', []).chunk(10).value();
        }

        return { 
            ...state,
            appList: _list,
            filteredAppList: _.first(_list)
        }
    case APP_LIST_SHOW_NEXT_TEN_ITEMS:
        if(state.hasMoreItems){
            const next10Apps: Array<AppItemObj> = _.first(state.appList);
            state.filteredAppList = state.filteredAppList.concat(next10Apps);
            state.appList.shift();
        }

        state.hasMoreItems = !_.isEmpty(state.appList);
        return {
            ...state
        }
    default:
        return state;
    }
}