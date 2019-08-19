// @flow
import React from 'react';
import { useMappedState } from 'redux-react-hook';
import LoadingSpinner from '../../LoadingSpinner/components/LoadingSpinner';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import type { RootState } from '../../types';

export default function AppLoader() {

    const isAppLoading: boolean = useMappedState((state: RootState)=> {
        return state.AppListReducer.isAppLoading;
    });

    return (
        (isAppLoading) ? 
            <div id="app-loader" className='row'>
                <LoadingSpinner icon={faSyncAlt} size="2x" spin={true} isfullscreen={false}></LoadingSpinner>
            </div> : false
    )
}