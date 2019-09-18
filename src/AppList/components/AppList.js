// @flow
import React from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import InfiniteScroll from 'react-infinite-scroller';
import AppItem from './AppItem';
import { LOAD_NEXT_10_APPS } from '../../actionTypes';
import _ from 'lodash';
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
            <div className='row apps-not-found'>
                <h1>找不到應用程式</h1>
            </div>
        )
    }

    async function loadNext10Apps () {
        dispatch({ type: LOAD_NEXT_10_APPS, ids: idsforNext10Items});
    }

    return (
        <div id="app-list-container">
            {
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
            }
        </div>
    )
}