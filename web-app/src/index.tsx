import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './state';
import reportWebVitals from './reportWebVitals';
import { App } from './App';

import './polyfills/eventListener';
import './polyfills/date';

import './scripts/isKeyboardNavigation';
import './scripts/scrollFocusIntoView';
import './scripts/lastFocusedElement';

import './normalize.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
