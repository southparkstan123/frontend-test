// @flow
import type { RootState, AppItemObj } from '../../types';
import React, { useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { CSSTransitionGroup } from 'react-transition-group';
import RecommendedAppList from '../../RecommendedApp/components/RecommendedAppList';
import SearchBar from '../../SearchBar/components/SearchBar';
import AppList from '../../AppList/components/AppList';
import LoadingSpinner from '../../LoadingSpinner/components/LoadingSpinner';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchAllData, searchApp } from '../../dao/AppsDao';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {
    GET_RECOMMENDED_APPS,
    SITE_CONFIG_LOADING,
    SITE_CONFIG_LOADED,
    APP_LIST_GET_FIRST_TEN_APPS,
    ERROR,
    SEARCH_RESULT_BY_KEYWORD,
    APP_RESULT_SEARCHING,
    APP_RESULT_SEARCHED
} from '../../actionTypes';
import AppLoader from '../../AppList/components/AppLoader';

async function initData(dispatch) {
    dispatch({ type: SITE_CONFIG_LOADING });
    try {
        const result = await fetchAllData();
        const { hunderAppsIds, first10FreeAppsResult, recomendedAppsResult } = result;

        dispatch({ type: APP_LIST_GET_FIRST_TEN_APPS, data: { hunderAppsIds, first10FreeAppsResult } });
        dispatch({ type: GET_RECOMMENDED_APPS, data: recomendedAppsResult });
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

    const isAppSearching = useMappedState((state: RootState) => {
        return state.AppListReducer.isAppSearching;
    });

    useEffect(() => {
        initData(dispatch);
        return () => {
            dispatch({ type: SITE_CONFIG_LOADED });
        }
    }, [dispatch]);

    async function handleSearchApps(keyword: string){
        try {
            const data: Array<AppItemObj> = await searchApp(keyword);
            console.log(data);
            dispatch({
                type: SEARCH_RESULT_BY_KEYWORD,
                data
            })
        } catch (error) {
            dispatch({ type: ERROR , error: error });
        } finally{
            dispatch({ type: APP_RESULT_SEARCHED });
        }    
    }

    async function handleInputChange(keyword: string) {
        dispatch({ type: APP_RESULT_SEARCHING });
        AwesomeDebouncePromise(handleSearchApps(keyword), 2000)
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
                            {
                                (!isAppSearching) ? <AppList></AppList> : <LoadingSpinner icon={faSpinner} size="2x" spin={true} isfullscreen={false}></LoadingSpinner>
                            }
                            <AppLoader></AppLoader>
                        </div>
                    </CSSTransitionGroup>
                    :
                    <LoadingSpinner icon={faSpinner} size="6x" spin={true} isfullscreen={true}></LoadingSpinner>
            }
        </div>
    );
}

export default AppContainer;
