// @flow
import type { RecommendedAppState, AppItemObj } from  "../types";
import _ from "lodash";
import { GET_RECOMMENDED_APPS } from '../actionTypes';

const initialState: RecommendedAppState = {
    data: []
}

type RecommendedAppAction = {
    type: string,
    data: Array<AppItemObj>
}

export default function RecommendedAppReducer(state: RecommendedAppState = initialState, action: RecommendedAppAction){
    switch(action.type){
    case GET_RECOMMENDED_APPS:
        return {
            data: _.chain(action).get('data', []).value()
        }
    default:
        return state;
    }
}