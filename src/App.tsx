import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from 'core/store';
import { type JSX } from 'react';
import { Provider } from 'react-redux';

import { Router } from './core/router';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
