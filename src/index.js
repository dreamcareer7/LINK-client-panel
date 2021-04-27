import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistStoreData, store } from './redux/store';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(registration => {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(err => {
      console.log('Service worker registration failed, error:', err);
    });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStoreData}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
