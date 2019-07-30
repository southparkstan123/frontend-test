import data from '../../../mock/FreeAppList.json';
import _ from 'lodash';
import AppListReducer from '../AppListReducer';
import { 
    SEARCH_RESULT_BY_KEYWORD, 
    APP_LIST_GET_FIRST_TEN_APPS,
    APP_LIST_SHOW_NEXT_TEN_ITEMS 
} from '../../actionTypes';

describe('AppListReducer', () => {

    let initialState = {}

    beforeEach(() => {

        initialState = {
            appList: [],
            filteredAppList: [],
            hasMoreItems: false
        }

    });

    it('should return initial state', () => {
        const result = AppListReducer(undefined, {});
        expect(result).toEqual({
            appList: [],
            filteredAppList: [],
            hasMoreItems: false
        })
    });

    it('should get first 10 apps to "filteredAppList" from "appList"', () => {
        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, data });

        expect(result.filteredAppList).toHaveLength(10);
        expect(result.appList).toHaveLength(9);
        result.appList.forEach(item => {
            expect(item).toHaveLength(10);
        });
        expect(result.hasMoreItems).toBe(true);
    });

    it('should get another 10 apps to "filteredAppList" from "appList" from "appList" when it is not empty', () => {

        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, data });
        
        
        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });

        expect(result.filteredAppList).toHaveLength(20);
        expect(result.appList).toHaveLength(8);
        result.appList.forEach(item => {
            expect(item).toHaveLength(10);
        });
        expect(result.hasMoreItems).toBe(true);

        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });

        expect(result.filteredAppList).toHaveLength(30);
        expect(result.appList).toHaveLength(7);
        result.appList.forEach(item => {
            expect(item).toHaveLength(10);
        });
        expect(result.hasMoreItems).toBe(true);
    });

    it('should not get another 10 apps to "filteredAppList" from "appList" when it is empty', () => {

        let result = AppListReducer(initialState, {type: APP_LIST_GET_FIRST_TEN_APPS, data });

        while(result.appList.length > 0) {
            result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });
        }
        
        expect(result.filteredAppList).toHaveLength(100);
        expect(result.appList).toHaveLength(0);
        expect(result.hasMoreItems).toBe(true);


        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });
        
        expect(result.filteredAppList).toHaveLength(100);
        expect(result.appList).toHaveLength(0);
        expect(result.hasMoreItems).toBe(false);

        // Dispatch again
        result = AppListReducer(result, {type: APP_LIST_SHOW_NEXT_TEN_ITEMS });
        
        expect(result.filteredAppList).toHaveLength(100);
        expect(result.appList).toHaveLength(0);
        expect(result.hasMoreItems).toBe(false);
    });

});