// @flow
import React from 'react';
import StarRatings from 'react-star-ratings';
import Icon from '../../Icon/components/Icon';
import type { AppItemProps } from "../../types";

export default function AppItem(props: AppItemProps) {
    return (
        <div className="app-item item-border">
            <div className="media">
                <div className="index">{props.index}</div>
                <Icon index={props.index} isAppListIcon={true} urlLinks={props.avatar} alt={props.name}></Icon>
                <div className="media-body">
                    <div className="name">{props.name}</div>
                    <div className="category">{props.category}</div>
                    <div className="rating">
                        <StarRatings 
                            starRatedColor="#eee000" 
                            rating={props.averageUserRating} 
                            starDimension="17px" 
                            starSpacing="1px"
                        />
                        <span>({props.userRatingCount})</span>
                    </div>
                </div>
            </div>
        </div>
    )
}