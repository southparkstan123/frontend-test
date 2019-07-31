import _ from "lodash";
import { GET_RECOMMENDED_APPS } from '../actionTypes';

const initialState = {
    data: []
}

export default function RecommendedAppReducer(state = initialState, action){
    switch(action.type){
        case GET_RECOMMENDED_APPS:
            return {
                data: _.chain(action).get('data', []).value()
            }
        default:
            return state;
    }
}