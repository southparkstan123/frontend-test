import RecommendedAppItem from '../RecommendedAppItem';
import React from 'react';

import data from '../../../../mock/RecommendedAppList.json';
import { shallow } from "enzyme";

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

xdescribe('<RecommendedAppItem />', () => {
    it('should be rendered', () => {
        const index = 0;
        const item = data[index];
        const props = dataToProps(item, index);
        const wrapper = shallow(<RecommendedAppItem {...props}></RecommendedAppItem>)

        expect(wrapper).toMatchSnapshot();
    });
})