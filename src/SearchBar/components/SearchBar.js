import React from 'react';

export default function SearchBar(props) {
  return (
    <nav id="search-bar" className="sticky-top navbar-light bg-light p-2">
      <div className="input-group">
        <input id="search-input" onChange={(event) => {props.onChangeKeyword(event.target.value.trim())}} className="text-center form-control mx-5" type="text" placeholder='搜尋' />
      </div>
    </nav>
  )
}
