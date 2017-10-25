import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from './reducers';

const store = createStore(reducer);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
