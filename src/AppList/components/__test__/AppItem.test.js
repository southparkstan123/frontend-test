import React from 'react';
import { shallow } from "enzyme";

import AppItem from '../AppItem'
import data from '../../../../mock/FreeAppList.json';

function dataToProps(item, index){
    return {
        index: index + 1,
        name: item.name,
        category: item.category,
        avatar: item.avatar,
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
        expect(wrapper.find('img.icon-rounded.sm')).toHaveLength(1);
        expect(wrapper.find('img.icon-rounded.lg')).toHaveLength(1);
    });

    it('the icon should be circled when it is 12th item in the list', () => {
        const index = 11;
        const item = data[index];
        const props = dataToProps(item, index);
        const wrapper = shallow(<AppItem {...props}></AppItem>)

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('img.icon-rounded-circle.sm')).toHaveLength(1);
        expect(wrapper.find('img.icon-rounded-circle.lg')).toHaveLength(1);
    });
})