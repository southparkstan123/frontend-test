// @flow
import type { RecommendedAppListProps, RecommendedAppState, AppItemObj } from '../../types';
import React from 'react';
import { useMappedState } from 'redux-react-hook';
import * as _ from 'lodash';

import RecommendedAppItem from './RecommendedAppItem';

export default function RecommendedAppList(props: RecommendedAppListProps) {
    const list: Array<AppItemObj> = useMappedState((state: RecommendedAppState) => {
        return _.get(state, 'RecommendedAppReducer.data', []);
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
            {(list && list.length > 0) ?
                <div id="recommended-app-container" className="w-100 d-flex flex-row p-2">
                    {list.map((item: AppItemObj, index: number) =>
                        <RecommendedAppItem
                            key={index}
                            {...item}
                        ></RecommendedAppItem>)
                    }
                </div> : emptyAppList()
            }
        </div>)
}