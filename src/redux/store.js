import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/RootReducer';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export const persistStoreData = persistStore(store);
