import _ from "lodash";

const initialState = {
    data: [],
    isShow: true
}

export default function RecommendedAppReducer(state = initialState, action){
    switch(action.type){
        case "GET_RECOMMENDED_APPS":
            return {
                data: _.chain(action).get('data', []).value()
            }
        default:
            return state;
    }
}