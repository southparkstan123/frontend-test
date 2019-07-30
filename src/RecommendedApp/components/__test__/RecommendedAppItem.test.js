import RecommendedAppItem from '../RecommendedAppItem';
import _ from 'lodash';
import data from '../../../../mock/RecommendedAppList.json';

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

describe('<RecommendedAppItem />', () => {
    it('should be rendered', () => {
        const index = 0;
        const item = data[index];
        const props = dataToProps(item, index);
        const wrapper = shallow(<RecommendedAppItem {...props}></RecommendedAppItem>)

        expect(wrapper).toMatchSnapshot();
    });
})