import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import './bootstrap.min.css';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store/configureStore';
import { Provider } from 'react-redux';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
