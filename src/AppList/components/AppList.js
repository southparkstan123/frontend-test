import React from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import InfiniteScroll from 'react-infinite-scroller';
import AppItem from './AppItem';
import { APP_LIST_SHOW_NEXT_TEN_ITEMS } from '../../actionTypes'

export default function AppList() {

  const dispatch = useDispatch();

  const filteredAppList = useMappedState((state)=> {
    return state.AppListReducer.filteredAppList;
  });

  const hasMoreItems = useMappedState((state)=> {
    return state.AppListReducer.hasMoreItems;
  });

  const emptyAppList = () => {
    return (
      <div className='my-5 d-flex justify-content-center'>
        <h1>找不到應用程式</h1>
      </div>
    )
  }

  const loadNext10Apps = () => {
    dispatch({ type: APP_LIST_SHOW_NEXT_TEN_ITEMS })
  }

  return (
    (filteredAppList && filteredAppList.length > 0) ?
    <InfiniteScroll
      pageStart={0}
      loadMore={loadNext10Apps}
      hasMore={hasMoreItems}
      className="row"
      threshold={100}
    >
    {
      filteredAppList.map((appItem, index) => 
        <AppItem 
          key={index}
          index={index + 1} 
          name={appItem.name}
          category={appItem.category}
          avatar={appItem.avatar}
          averageUserRating={appItem.averageUserRating}
          userRatingCount={appItem.userRatingCount}
        ></AppItem>
      ) 
    }
    </InfiniteScroll> : emptyAppList()
  )
}