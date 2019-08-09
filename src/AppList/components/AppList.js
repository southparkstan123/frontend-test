// @flow
import React from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import InfiniteScroll from 'react-infinite-scroller';
import AppItem from './AppItem';
import { APP_LIST_SHOW_NEXT_TEN_ITEMS, ERROR, APP_RESULT_LOADING, APP_RESULT_LOADED } from '../../actionTypes';
import _ from 'lodash';
import { fetchAppsData } from '../../dao/AppsDao';

import type { RootState, AppItemObj } from '../../types'

export default function AppList() {

    const dispatch = useDispatch();

    const filteredAppList: Array<AppItemObj> = useMappedState((state: RootState)=> {
        return state.AppListReducer.filteredAppList;
    });

    const hasMoreItems: boolean = useMappedState((state: RootState)=> {
        return state.AppListReducer.hasMoreItems;
    });

    const idsforNext10Items: Array<string> = useMappedState((state: RootState)=> {
        return _.chain(state).get('AppListReducer.appListIds', []).first().value();
    });

    const EmptyAppList = () => {
        return (
            <div className='row my-5 justify-content-center'>
                <h1>找不到應用程式</h1>
            </div>
        )
    }

    async function loadNext10Apps () {
        dispatch({ type: APP_RESULT_LOADING });
        try {
            const result: Array<AppItemObj> = await fetchAppsData(idsforNext10Items);
            dispatch({ type: APP_LIST_SHOW_NEXT_TEN_ITEMS , data: result })
        } catch (error) {
            dispatch({ type: ERROR , error: error });
        } finally {
            dispatch({ type: APP_RESULT_LOADED });
        }
    }

    return (
        (filteredAppList && filteredAppList.length > 0) ?
            (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadNext10Apps}
                    hasMore={hasMoreItems}
                    className="row"
                    initialLoad={false}
                >
                    {
                        filteredAppList.map((appItem: AppItemObj, index: number) => 
                            <AppItem 
                                key={index}
                                index={index + 1} 
                                {...appItem}
                            ></AppItem> 
                        )
                    }
                </InfiniteScroll>
            ) : EmptyAppList()
    )
}