import React from 'react';
import { mount } from "enzyme";

import RecommendedAppList from '../RecommendedAppList';
import { StoreContext } from 'redux-react-hook';
import data from '../../../../mock/RecommendedAppList.json';

import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

describe('<RecommendedAppList />', () => {

    let wrapper, store;

    beforeEach(() => {

        const initialState = {
            RecommendedAppReducer: {
                data
            }
        };

        store = mockStore(initialState);
        
        wrapper = mount(
            <StoreContext.Provider value={store}>
                <RecommendedAppList title="Test title"/>
            </StoreContext.Provider> 
        );
    });

    it('should be rendered', () => {

        expect(wrapper.find('div.recommended-app-item')).toHaveLength(10);
        expect(wrapper).toMatchSnapshot();
    });

    it('"No item" should be shown if no recommended apps data', () => {
        const initialState = {
            RecommendedAppReducer: {
                data: []
            }
        };

        store = mockStore(initialState);
        
        wrapper = mount(
            <StoreContext.Provider value={store}>
                <RecommendedAppList title="Test title"/>
            </StoreContext.Provider> 
        );

        expect(wrapper.find('div').find('h1').text()).toEqual("找不到應用程式");
    });

});
