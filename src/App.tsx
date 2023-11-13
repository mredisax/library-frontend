import './App.css';

import { store } from 'core/store';
import { type JSX } from 'react';
import { Provider } from 'react-redux';

import { Router } from './core/router';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
