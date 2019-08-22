// @flow
import type { RecommendedAppItemProps } from '../../types';
import React from 'react';
import Icon from '../../Icon/components/Icon';

export default function RecommendedAppItem(props: RecommendedAppItemProps) {
    return (
        <div className="recommended-app-item">
            <Icon index={0} isAppListIcon={false} urlLinks={props.avatar} alt={props.name}></Icon>
            <div className="name">{props.name}</div>
            <div className="category">{props.category}</div>
        </div>
    )
}