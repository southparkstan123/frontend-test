import _ from "lodash";
import { 
    APP_LIST_GET_FIRST_TEN_APPS,
    SEARCH_RESULT_BY_KEYWORD,
    APP_LIST_SHOW_NEXT_TEN_ITEMS
} from '../actionTypes';

const initialState = {
    appList: [],
    filteredAppList: [],
    hasMoreItems: false
}

export default function AppListReducer(state = initialState, action){
    switch(action.type){
    case APP_LIST_GET_FIRST_TEN_APPS:
        let list = _.chain(action).get('data', []).chunk(10).value();
        const filteredAppList = _.first(list);
        list.shift();

        return {
            ...state,
            appList: list,
            filteredAppList,
            hasMoreItems: true
        }
    case SEARCH_RESULT_BY_KEYWORD:
        const keyword = action.keyword;
        state.hasMoreItems = (state.appList.length === 0);

        let _list = [];
        if (keyword !== "") {
            const result = _.chain(action)
                .get('data', [])
                .flatten()
                .filter(item => (item.name && item.category) ? 
                    (
                        item.name.toLowerCase().includes(keyword.toLowerCase()) || 
                            item.category.toLowerCase().includes(keyword.toLowerCase()) ||
                            item.summary.toLowerCase().includes(keyword.toLowerCase()) ||
                            item.artistName.toLowerCase().includes(keyword.toLowerCase())
                    )
                    : item)
                .value();
            _list = _.chain(result).chunk(10).value();
        } else {
            _list = _.chain(action).get('data', []).chunk(10).value();
        }

        return { 
            ...state,
            appList: _list,
            filteredAppList: _.first(_list)
        }
    case APP_LIST_SHOW_NEXT_TEN_ITEMS:
        if(state.hasMoreItems){
            const next10Apps = _.first(state.appList);
            state.filteredAppList = state.filteredAppList.concat(next10Apps);
            state.appList.shift();
        }

        state.hasMoreItems = !_.isEmpty(state.appList);
        return {
            ...state
        }
    default:
        return state;
    }
}