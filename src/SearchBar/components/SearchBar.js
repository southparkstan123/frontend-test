// @flow
import type { SearchBarProps, RootState } from '../../types';
import React from 'react';
import { useMappedState } from 'redux-react-hook';

export default function SearchBar(props: SearchBarProps) {

    const isSearching: boolean = useMappedState((state: RootState) => {
        return state.AppListReducer.isSearching;
    });

    return (
        <nav id="search-bar" className="sticky-top navbar-light bg-light p-2">
            <div className="input-group">
                <input 
                    id="search-input" 
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => props.onChangeKeyword(event.target.value.trim())} 
                    className="text-center form-control mx-5" 
                    type="text" 
                    disabled={isSearching}
                    placeholder='搜尋' />
            </div>
        </nav>
    )
}
