// @flow
import React from 'react';
import StarRatings from 'react-star-ratings';

import type { AppItemProps } from "../../types";

export default function AppItem(props: AppItemProps) {

    const classOfAvatar = (index: number): string => {
        return (index % 2 !== 0) ? "app-list-icon icon-rounded" : "app-list-icon icon-rounded-circle"
    }

    return (
        <div className="app-item item-border">
            <div className="media">
                <div className="index">{props.index}</div>
                <img className={`${classOfAvatar(props.index)} sm`} src={props.avatar.small} alt={props.name}></img>
                <img className={`${classOfAvatar(props.index)} lg`} src={props.avatar.large} alt={props.name}></img>
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