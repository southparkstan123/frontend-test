import data from '../../../mock/FreeAppList.json';
import _ from 'lodash';
import AppListReducer from '../AppListReducer';
import { 
    SEARCH_RESULT_BY_KEYWORD, 
    APP_LIST_GET_FIRST_TEN_APPS,
    APP_LIST_SHOW_NEXT_TEN_ITEMS,
    APP_RESULT_LOADED,
    APP_RESULT_LOADING,
    APP_RESULT_SEARCHING,
    APP_RESULT_SEARCHED
} from '../../actionTypes';

describe('AppListReducer', () => {

    let initialState = {}

    beforeEach(() => {

        initialState = {
            appListIds: [],
            filteredAppList: [],
            hasMoreItems: false,
            isAppLoading: false,
            isAppSearching: false,
            appListToBeSearch: []
        }

    });

    it('should return initial state', () => {
        const result = AppListReducer(undefined, {});
        expect(result).toEqual(initialState);
    });

    it('should get first 10 apps to "filteredAppList" from "appList"', () => {
        const action = {
            data: {
                hunderAppsIds: _.chain(data).map(item => item.appId).chunk(10).value(),
                first10FreeAppsResult: _.take(data, 10)
            }
        }

        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, ...action });

        expect(result.filteredAppList).toHaveLength(10);
        expect(result.appListIds).toHaveLength(9);
        result.appListIds.forEach(item => {
            expect(item.length).toBeLessThanOrEqual(10);
        });

        expect(result.hasMoreItems).toBe(true);
    });

    it('should get another 10 apps to "filteredAppList" from "appList" from "appList" when it is not empty', () => {

        const firstAction = {
            data: {
                hunderAppsIds: _.chain(data).map(item => item.appId).chunk(10).value(),
                first10FreeAppsResult: _.take(data, 10)
            }
        }
        
        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, ...firstAction });
        
        const secondAction = {
            data: _.chain(data).chunk(10).drop().first().value()
        }

        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS, ...secondAction });

        expect(result.filteredAppList).toHaveLength(20);
        expect(result.appListIds).toHaveLength(8);
        result.appListIds.forEach(item => {
            expect(item.length).toBeLessThanOrEqual(10);
        });
        expect(result.hasMoreItems).toBe(true);

        const thirdAction = {
            data: _.chain(data).chunk(10).drop().drop().first().value()
        }

        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS, ...thirdAction });

        expect(result.filteredAppList).toHaveLength(30);
        expect(result.appListIds).toHaveLength(7);
        result.appListIds.forEach(item => {
            expect(item.length).toBeLessThanOrEqual(10);
        });
        expect(result.hasMoreItems).toBe(true);
    });

    it('should not get another 10 apps to "filteredAppList" from "appList" when it is empty', () => {

        const firstAction = {
            data: {
                hunderAppsIds: _.chain(data).map(item => item.appId).chunk(10).value(),
                first10FreeAppsResult: _.take(data, 10)
            }
        }

        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, ...firstAction });

        let _index = 0;
        let _data = _.chain(data).chunk(10).value();

        while(result.appListIds.length > 0) {
            _index++
            let _action = {
                data: _.nth(_data, _index)
            }

            result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS ,..._action });
        }
        
        expect(result.filteredAppList).toHaveLength(99);
        expect(result.appListIds).toHaveLength(0);
        expect(result.hasMoreItems).toBe(false);

        // Dispatch again
        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });
        
        expect(result.filteredAppList).toHaveLength(99);
        expect(result.appListIds).toHaveLength(0);
        expect(result.hasMoreItems).toBe(false);
    });

    it('should return true when apps are loading' , () => {
        const result = AppListReducer(initialState, { type: APP_RESULT_LOADING });
        expect(result).toEqual({
            ...initialState,
            isAppLoading: true
        })
    });

    it('should return false when apps are loaded' , () => {
        const result = AppListReducer(initialState, { type: APP_RESULT_LOADED });
        expect(result).toEqual({
            ...initialState,
            isAppLoading: false
        })
    });

    it('should return true when apps are searching' , () => {
        const result = AppListReducer(initialState, { type: APP_RESULT_SEARCHING });
        expect(result).toEqual({
            ...initialState,
            isAppSearching: true
        })
    });

    it('should return false when apps are searched' , () => {
        const result = AppListReducer(initialState, { type: APP_RESULT_SEARCHED });
        expect(result).toEqual({
            ...initialState,
            isAppSearching: false
        })
    });

});
