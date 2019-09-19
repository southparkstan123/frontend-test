// @flow
import type { SiteConfigState } from '../types';
import { 
    SITE_CONFIG_LOADING,
    SITE_CONFIG_LOADED,
    RECOMMENDED_APPS_INITIALIZING,
    RECOMMENDED_APPS_INITIALIZED,
    APP_RESULT_INITIALIZING,
    APP_RESULT_INITIALIZED
} from '../actionTypes';

const initialState = {
    isLoading: true,
    loadingState: ''
}

type SiteConfigAction = {
    type: string
}

export default function SiteConfigReducer (state: SiteConfigState = initialState, action: SiteConfigAction) {
    switch(action.type){
    case SITE_CONFIG_LOADING:
        return {
            ...state,
            isLoading: true
        }
    case SITE_CONFIG_LOADED:
        return {
            ...state,
            isLoading: false
        }
    case RECOMMENDED_APPS_INITIALIZING:
        return {
            ...state,
            loadingState: 'Recommended apps is loading...'
        }
    case RECOMMENDED_APPS_INITIALIZED:
        return {
            ...state,
            loadingState: 'Recommended apps is loaded!'
        }
    case APP_RESULT_INITIALIZING:
        return {
            ...state,
            loadingState: '100 apps is loading...'
        }
    case APP_RESULT_INITIALIZED:
        return {
            ...state,
            loadingState: '100 apps is loaded!'
        }
    default:
        return state;
    }
};