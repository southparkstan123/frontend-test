// @flow
import React from 'react';
import { StoreContext } from 'redux-react-hook';
import LandingPage from './LandingPage/components';
import { store } from './store';

function App() {
    return (
        <StoreContext.Provider value={store}>
            <LandingPage></LandingPage>
        </StoreContext.Provider>
    );
}

export default App;
