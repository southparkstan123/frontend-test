// @flow
import type { RecommendedAppItemProps } from '../../types';
import React from 'react';

export default function RecommendedAppItem(props: RecommendedAppItemProps) {
    return (
        <div className="recommended-app-item">
            <img className="rounded" src={props.avatar} alt={props.name} />
            <div className="name">{props.name}</div>
            <div className="category">{props.category}</div>
        </div>
    )
}