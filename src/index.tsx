import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { charactersAPI } from './features/ApiSlice';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ApiProvider api={charactersAPI}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </Provider>
);
