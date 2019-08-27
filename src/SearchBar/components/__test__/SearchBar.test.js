import _ from 'lodash';
import React from 'react';
import { mount } from "enzyme";
import { StoreContext } from 'redux-react-hook';
import configureMockStore from 'redux-mock-store';

import SearchBar from '../SearchBar';
import data from '../../../../mock/FreeAppList.json';

describe('<SearchBar />', () => {

    const mockStore = configureMockStore();
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
    });

    it('should be rendered', () => {
        const onChangeKeyword = jest.fn();

        wrapper = mount(
            <StoreContext.Provider value={store}>
                <SearchBar onChangeKeyword={onChangeKeyword} />
            </StoreContext.Provider>
        );

        expect(wrapper.find("nav#search-bar")).toHaveLength(1);
    });

    it('the function "handleChangeInput" should be triggered when the keyword is on changed', () => {
        const onChangeKeyword = jest.fn();

        wrapper = mount(
            <StoreContext.Provider value={store}>
                <SearchBar onChangeKeyword={onChangeKeyword} />
            </StoreContext.Provider>
        );

        wrapper.find('input#search-input').simulate('change', { target: { value: "T" } });

        expect(onChangeKeyword).toHaveBeenCalledWith("T");
    });

    it('the function "handleChangeInput" should be triggered when the keyword is on changed', () => {
        const onChangeKeyword = jest.fn();

        wrapper = mount(
            <StoreContext.Provider value={store}>
                <SearchBar onChangeKeyword={onChangeKeyword} />
            </StoreContext.Provider>
        );

        wrapper.find('input#search-input').simulate('change', { target: { value: " Test " } });

        expect(onChangeKeyword).toHaveBeenCalledWith("Test");
    });
});
