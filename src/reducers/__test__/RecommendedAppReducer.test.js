import RecommendedAppList from '../../../mock/RecommendedAppList.json';
import _ from 'lodash';
import RecommendedAppReducer from '../RecommendedAppReducer';
import { GET_RECOMMENDED_APPS } from '../../actionTypes';

describe('RecommendedAppReducer', () => {

    let initialState = {}

    beforeEach(() => {

        initialState = {
            data: []
        }

    });

    it('should return initial state' , () => {
        const result = RecommendedAppReducer(undefined, {});
        expect(result).toEqual({
            data: []
        })
    });

    it('should return 10 recommended apps' , () => {
        const result = RecommendedAppReducer(initialState, { type:GET_RECOMMENDED_APPS,  data: RecommendedAppList });
        expect(result.data).toHaveLength(10)
    });
});