// @flow
import type { RootState } from '../../types';
import React, { useEffect, useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { CSSTransitionGroup } from 'react-transition-group';
import RecommendedAppList from '../../RecommendedApp/components/RecommendedAppList';
import SearchBar from '../../SearchBar/components/SearchBar';
import AppList from '../../AppList/components/AppList';
import LoadingSpinner from '../../LoadingSpinner/components/LoadingSpinner';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
    SITE_CONFIG_LOADED,
    SEARCHING_APPS,
    LOAD_ALL_DATA
} from '../../actionTypes';
import AppLoader from '../../AppList/components/AppLoader';
import useDebounce from '../../utils/useDebounce';

function LandingPage() {
    const dispatch = useDispatch();

    const [searchKeyword, setSearchKeyword] = useState('');

    const isLoading = useMappedState((state: RootState) => {
        return state.SiteConfigReducer.isLoading;
    });

    const isAppSearching = useMappedState((state: RootState) => {
        return state.AppListReducer.isAppSearching;
    });

    const loadingState = useMappedState((state: RootState) => {
        return state.SiteConfigReducer.loadingState;
    });

    const debouncedSearchKeyword = useDebounce(searchKeyword, 2000);

    useEffect(() => {
        if(debouncedSearchKeyword){
            dispatch({ type: SEARCHING_APPS, keyword: debouncedSearchKeyword })
        } else {
            dispatch({ type: LOAD_ALL_DATA });
        }

        return () => {
            dispatch({ type: SITE_CONFIG_LOADED });
        }
    }, [dispatch, debouncedSearchKeyword]);

    const loadingStateStyle = {
        position: 'fixed',
        top: 'calc(50% - 0.5rem * 2)',
        right: 0,
        bottom: 0,
        left: 0,
        textAlign: 'center'
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
                    <div id="loading-state" style={loadingStateStyle}>
                        <h1>{loadingState}</h1>
                    </div>
            }
        </div>
    );
}

export default LandingPage;
