import data from '../../../mock/FreeAppList.json';
import _ from 'lodash';
import AppListReducer from '../AppListReducer';
import { 
    SEARCH_RESULT_BY_KEYWORD, 
    APP_LIST_GET_FIRST_TEN_APPS,
    APP_LIST_SHOW_NEXT_TEN_ITEMS,
    SEARCH_RESULT_LOADED,
    SEARCH_RESULT_LOADING
} from '../../actionTypes';

describe('AppListReducer', () => {

    let initialState = {}

    beforeEach(() => {

        initialState = {
            appList: [],
            filteredAppList: [],
            hasMoreItems: false,
            isSearching: false,
            appListToBeSearch: []
        }

    });

    it('should return initial state', () => {
        const result = AppListReducer(undefined, {});
        expect(result).toEqual(initialState);
    });

    it('should get first 10 apps to "filteredAppList" from "appList"', () => {
        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, data });

        expect(result.filteredAppList).toHaveLength(10);
        expect(result.appList).toHaveLength(9);
        expect(result.appListToBeSearch.length).toBeLessThanOrEqual(100);

        result.appList.forEach(item => {
            expect(item.length).toBeLessThanOrEqual(10);
        });
        expect(result.hasMoreItems).toBe(true);
    });

    it('should get another 10 apps to "filteredAppList" from "appList" from "appList" when it is not empty', () => {

        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, data });
        
        
        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });

        expect(result.filteredAppList).toHaveLength(20);
        expect(result.appList).toHaveLength(8);
        result.appList.forEach(item => {
            expect(item.length).toBeLessThanOrEqual(10);
        });
        expect(result.hasMoreItems).toBe(true);

        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });

        expect(result.filteredAppList).toHaveLength(30);
        expect(result.appList).toHaveLength(7);
        result.appList.forEach(item => {
            expect(item.length).toBeLessThanOrEqual(10);
        });
        expect(result.hasMoreItems).toBe(true);
    });

    it('should not get another 10 apps to "filteredAppList" from "appList" when it is empty', () => {

        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, data });

        while(result.appList.length > 0) {
            result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });
        }
        
        expect(result.filteredAppList).toHaveLength(99);
        expect(result.appList).toHaveLength(0);
        expect(result.hasMoreItems).toBe(false);

        // Dispatch again
        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });
        
        expect(result.filteredAppList).toHaveLength(99);
        expect(result.appList).toHaveLength(0);
        expect(result.hasMoreItems).toBe(false);
    });

    it('should search by keyword', () => {
        let keyword = "T"

        //Init data first
        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, data });
        //Then search
        result = AppListReducer(result, {type: SEARCH_RESULT_BY_KEYWORD, keyword });

        expect(result.filteredAppList).toHaveLength(10);
        expect(result.appList).toHaveLength(8);
        expect(result.hasMoreItems).toBe(true);

        keyword = "Te";
        result = AppListReducer(result, {type: SEARCH_RESULT_BY_KEYWORD, keyword });

        expect(result.filteredAppList).toHaveLength(10);
        expect(result.appList).toHaveLength(6);

        expect(_.flatten(result.appList)).toHaveLength(52);
        expect(result.hasMoreItems).toBe(true);

        keyword = "";
        result = AppListReducer(result, {type: SEARCH_RESULT_BY_KEYWORD, keyword });

        expect(result.filteredAppList).toHaveLength(10);
        expect(result.appList).toHaveLength(9);

        expect(_.flatten(result.appList)).toHaveLength(89);
        expect(result.hasMoreItems).toBe(true);




    })

    it('should return true when apps are searching' , () => {
        const result = AppListReducer(initialState, { type: SEARCH_RESULT_LOADING });
        expect(result).toEqual({
            ...initialState,
            isSearching: true
        })
    });

    it('should return false when apps are searched' , () => {
        const result = AppListReducer(initialState, { type: SEARCH_RESULT_LOADED });
        expect(result).toEqual({
            ...initialState,
            isSearching: false
        })
    });

});
