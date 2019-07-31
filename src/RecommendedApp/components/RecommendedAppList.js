import React from 'react';
import { useMappedState } from 'redux-react-hook';
import get from 'lodash/get';

import RecommendedAppItem from './RecommendedAppItem';

export default function RecommendedAppList(props) {
  const list = useMappedState((state) => {
    return get(state, 'RecommendedAppReducer.data',[]);
  });

  const emptyAppList = () => {
    return (
      <div className='w-100 text-center my-3'>
        <h5>找不到應用程式</h5>
      </div>
    )
  }

  return (
    <div className="row border-bottom">
      <div className="mx-2">{props.title}</div>
      {
        (list && list.length > 0) ? 
        <div id="recommended-app-container" className="w-100 d-flex flex-row p-2">
        {
          list.map((item, index) => 
            <RecommendedAppItem
              key={index}
              avatar={item.avatar}
              name={item.name}
              category={item.category}
            ></RecommendedAppItem> 
          )
        }
        </div> : emptyAppList()
      }
      
    </div>
  )
}