import React from 'react';
import StarRatings from 'react-star-ratings';

export default function AppItem(props) {

  const classOfAvatar = (index) => {
    return (index % 2 !== 0) ? "mx-3 rounded" : "mx-3 rounded-circle"
  }

  return (
    <div className="app-item col-sm-12 col-md-6 item-border">
      <div className="media p-2 d-flex align-items-center">
        <div className="index">{props.index}</div>
        <img className={classOfAvatar(props.index)} src={props.images[2].label} alt={props.name}></img>
        <div className="media-body ml-3">
          <div className="name">{props.name}</div>
          <div className="category justify-content-center">{props.category}</div>
          <div className="rating align-items-center">
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