import _ from 'lodash';
import React from 'react';
import { mount } from "enzyme";
import { StoreContext } from 'redux-react-hook';

import AppContainer from "../components/index";
import FreeAppList from '../../../mock/FreeAppList.json';

import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

xdescribe('<AppContainer />', () => {
    let wrapper, store;

    beforeEach(() => {

        let list = _.chain(FreeAppList).chunk(10).value();
        const firstTenItems = _.first(list);
        list.shift();

        const initialState = {
            AppListReducer: {
                filteredAppList: firstTenItems,
                appList: list,
                hasMoreItems: true
            },
            SiteConfigReducer: {
                isLoading: true
            }
        };

        store = mockStore(initialState);
        
        wrapper = mount(
            <StoreContext.Provider value={store}>
                <AppContainer />
            </StoreContext.Provider> 
        );
    });

    it('should be rendered', () => {
        expect(wrapper.find('div#main')).toHaveLength(1);
        expect(wrapper.find('div#main').find('.spinner')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    })
})
