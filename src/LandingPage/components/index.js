// @flow
import type { RootState, AppItemObj } from '../../types';
import React, { useEffect, useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { CSSTransitionGroup } from 'react-transition-group';
import RecommendedAppList from '../../RecommendedApp/components/RecommendedAppList';
import SearchBar from '../../SearchBar/components/SearchBar';
import AppList from '../../AppList/components/AppList';
import AppLoader from '../../AppList/components/AppLoader';
import LoadingSpinner from '../../LoadingSpinner/components/LoadingSpinner';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchAllData, searchApp } from '../../dao/AppsDao';
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
import PageLoader from '../../PageLoader/components';
import useDebounce from '../../utils/useDebounce';

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

function LandingPage() {
    const dispatch = useDispatch();

    const [searchKeyword, setSearchKeyword] = useState('');

    const isLoading = useMappedState((state: RootState) => {
        return state.SiteConfigReducer.isLoading;
    });

    const isAppSearching = useMappedState((state: RootState) => {
        return state.AppListReducer.isAppSearching;
    });

    const debouncedSearchKeyword = useDebounce(searchKeyword, 2000);

    useEffect(() => {
        if(debouncedSearchKeyword){
            dispatch({ type: APP_RESULT_SEARCHING });
            searchApp(debouncedSearchKeyword)
                .then((data: Array<AppItemObj>) => {
                    dispatch({ type: SEARCH_RESULT_BY_KEYWORD, data })
                })
                .catch(error => dispatch({ type: ERROR , error: error }))
                .finally(() => {
                    dispatch({ type: APP_RESULT_SEARCHED });
                });
        } else {
            initData(dispatch);
        }

        return () => {
            dispatch({ type: SITE_CONFIG_LOADED });
        }
    }, [dispatch, debouncedSearchKeyword]);

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
                        <SearchBar onChangeKeyword={setSearchKeyword}></SearchBar>
                        <div className="apps-container">
                            <RecommendedAppList title="推介"></RecommendedAppList>
                            {
                                (!isAppSearching) ? <AppList></AppList> : <LoadingSpinner icon={faSpinner} size="2x" spin={true} isfullscreen={false}></LoadingSpinner>
                            }
                            <AppLoader></AppLoader>
                        </div>
                    </CSSTransitionGroup>
                    :
                    <PageLoader></PageLoader>
            }
        </div>
    );
}

export default LandingPage;
