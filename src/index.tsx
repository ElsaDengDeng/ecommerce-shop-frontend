import React from 'react';
import { createRoot } from 'react-dom/client';

import { history, store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './style.css';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
