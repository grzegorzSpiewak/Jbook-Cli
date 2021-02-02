import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'state';
import App from './App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
