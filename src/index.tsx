import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { storeSetup } from './app/store';
import { Provider } from 'react-redux';
import './App.css';

const store = storeSetup();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
