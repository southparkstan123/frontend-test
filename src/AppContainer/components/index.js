// @flow
import type { RootState } from '../../types';
import React, { useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { CSSTransitionGroup } from 'react-transition-group';
import RecommendedAppList from '../../RecommendedApp/components/RecommendedAppList';
import SearchBar from '../../SearchBar/components/SearchBar';
import AppList from '../../AppList/components/AppList';
import LoadingSpinner from '../../LoadingSpinner/components/LoadingSpinner';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchAllData } from '../../dao/AppsDao'
import {
    GET_RECOMMENDED_APPS,
    SITE_CONFIG_LOADING,
    SITE_CONFIG_LOADED,
    APP_LIST_GET_FIRST_TEN_APPS,
    ERROR,
    SEARCH_RESULT_BY_KEYWORD,
    SEARCH_RESULT_LOADING,
    SEARCH_RESULT_LOADED
} from '../../actionTypes';

async function initData(dispatch) {
    dispatch({ type: SITE_CONFIG_LOADING });
    try {
        const result = await fetchAllData();
        dispatch({ type: APP_LIST_GET_FIRST_TEN_APPS, data: result.freeAppsResult });
        dispatch({ type: GET_RECOMMENDED_APPS, data: result.recomendedAppsResult });
    } catch (error) {
        return error;
    } finally {
        dispatch({ type: SITE_CONFIG_LOADED });
    }
}

function AppContainer() {
    const dispatch = useDispatch();

    const isLoading = useMappedState((state: RootState) => {
        return state.SiteConfigReducer.isLoading;
    });

    useEffect(() => {
        initData(dispatch);
        return () => {
            dispatch({ type: SITE_CONFIG_LOADED });
        }
    }, [dispatch]);

    async function handleInputChange(keyword: string){
        try {
            dispatch({ type: SEARCH_RESULT_LOADING });
            dispatch({
                type: SEARCH_RESULT_BY_KEYWORD, 
                keyword
            });
        } catch (error) {
            dispatch({ type: ERROR , error: error })
        } finally{
            dispatch({ type: SEARCH_RESULT_LOADED });
        }
    }

    return (
        <div id="main">
            {
                (!isLoading) ?
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}
                    >
                        <SearchBar onChangeKeyword={handleInputChange}></SearchBar>
                        <div className="container-fluid mt-2">
                            <RecommendedAppList title="推介"></RecommendedAppList>
                            <AppList></AppList>
                        </div>
                    </CSSTransitionGroup>
                    :
                    <LoadingSpinner icon={faSpinner} size="6x" spin={true}></LoadingSpinner>
            }
        </div>
    );
}

export default AppContainer;
