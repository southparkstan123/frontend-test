// @flow
import type { SearchBarProps } from '../../types';
import React from 'react';

export default function SearchBar(props: SearchBarProps) {

    return (
        <nav id="search-bar">
            <div className="input-wrapper">
                <input 
                    id="search-input" 
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => props.onChangeKeyword(event.target.value.trim())} 
                    className="text-center form-control" 
                    type="text"
                    placeholder='搜尋' />
            </div>
        </nav>
    )
}
