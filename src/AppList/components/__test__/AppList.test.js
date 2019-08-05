import _ from 'lodash';
import React from 'react';
import { mount } from "enzyme";

import AppList from '../AppList';
import data from '../../../../mock/FreeAppList.json';
import { StoreContext } from 'redux-react-hook';

import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

xdescribe('<AppList />', () => {

    let wrapper, store;

    beforeEach(() => {

        let list = _.chain(data).chunk(10).value();
        const firstTenItems = _.first(list);
        list.shift();

        const initialState = {
            AppListReducer: {
                filteredAppList: firstTenItems,
                appList: list,
                hasMoreItems: true
            }
        };

        store = mockStore(initialState);
        
        wrapper = mount(
            <StoreContext.Provider value={store}>
                <AppList />
            </StoreContext.Provider> 
        );
    });

    it('first ten items should be rendered', () => {
        expect(wrapper.find('div.app-item')).toHaveLength(10);
    });

    it('"找不到應用程式" should be shown if both "filteredAppList" and "appList" are empty', () => {
        const initialState = {
            AppListReducer: {
                filteredAppList: [],
                appList: [],
                hasMoreItems: false
            }
        };

        store = mockStore(initialState);
        
        wrapper = mount(
            <StoreContext.Provider value={store}>
                <AppList />
            </StoreContext.Provider> 
        );

        expect(wrapper.find('div').find('h1').text()).toEqual("找不到應用程式");
    });


})