import React from 'react';
import { useMappedState } from 'redux-react-hook';

export default function AppLoader() {

    const isAppLoading: boolean = useMappedState((state: RootState)=> {
        return state.AppListReducer.isAppLoading;
    });

    return (
        (isAppLoading) ? 
            <div className='row my-5 justify-content-center'>
                <h5>Loading...</h5>
            </div> : false
    )
}