import _ from 'lodash';
import React from 'react';
import { shallow } from "enzyme";

import AppItem from '../AppItem'
import data from '../../../../mock/FreeAppList.json';

function dataToProps(item, index){
    return {
        index: index + 1,
        name: item.name,
        category: item.category,
        images: item.images,
        averageUserRating: item.averageUserRating,
        userRatingCount: item.userRatingCount
    }
}

describe('<AppItem />', () => {
    it('should be rendered', () => {
        const index = 0;
        const item = data[index];
        const props = dataToProps(item, index);
        const wrapper = shallow(<AppItem {...props}></AppItem>)

        expect(wrapper).toMatchSnapshot();
    });

    it('the icon should be rounded when it is 5th item in the list', () => {
        const index = 4;
        const item = data[index];
        const props = dataToProps(item, index);
        const wrapper = shallow(<AppItem {...props}></AppItem>)
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('div img').hasClass('rounded')).toBe(true);
    });

    it('the icon should be circled when it is 12th item in the list', () => {
        const index = 11;
        const item = data[index];
        const props = dataToProps(item, index);
        const wrapper = shallow(<AppItem {...props}></AppItem>)

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('div img').hasClass('rounded-circle')).toBe(true);
    });
})