import React from 'react';
import { StoreContext } from 'redux-react-hook';
import AppContainer from './AppContainer/components';
import { store } from './store';

function App() {
  return (
    <StoreContext.Provider value={store}>
      <AppContainer></AppContainer>
    </StoreContext.Provider>
  );
}

export default App;
