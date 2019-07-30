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
      <div className='my-5 d-flex justify-content-center'>
        <h1>找不到應用程式</h1>
      </div>
    )
  }

  return (
    <div className="row border-bottom">
      <div className="mx-2">{props.title}</div>
      <div id="recommended-app-container" className="d-flex flex-row p-2">
      {
        (list && list.length > 0) ? list.map((item, index) => 
          <RecommendedAppItem
            key={index}
            images={item.images}
            name={item.name}
            category={item.category}
          ></RecommendedAppItem> 
        ): emptyAppList()
      }
      </div>
    </div>
  )
}