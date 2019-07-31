import React from 'react';

export default function RecommendedAppItem(props) {
  return (
    <div className="recommended-app-item m-1">
      <img className="m-2 rounded" src={props.avatar} alt={props.name}/>
      <div className="name">{props.name}</div>
      <div className="category">{props.category}</div>
    </div>
  )
}