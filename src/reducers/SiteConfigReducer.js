// @flow
import type { SiteConfigState } from '../types';
import { 
    SITE_CONFIG_LOADING,
    SITE_CONFIG_LOADED
} from '../actionTypes';

const initialState = {
    isLoading: true
}

type SiteConfigAction = {
    type: string
}

export default function SiteConfigReducer (state: SiteConfigState = initialState, action: SiteConfigAction) {
    switch(action.type){
    case SITE_CONFIG_LOADING:
        return {
            isLoading: true
        }
    case SITE_CONFIG_LOADED:
        return {
            isLoading: false
        }
    default:
        return state;
    }
};