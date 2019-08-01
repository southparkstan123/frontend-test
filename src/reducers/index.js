// @flow
import { combineReducers } from 'redux';

import AppListReducer from './AppListReducer';
import RecommendedAppReducer from './RecommendedAppReducer';
import SiteConfigReducer from './SiteConfigReducer';

const rootReducer = combineReducers({
    AppListReducer,
    RecommendedAppReducer,
    SiteConfigReducer
});

export default rootReducer;