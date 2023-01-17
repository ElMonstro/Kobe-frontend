import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import rootReducer from './../reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../middleware/sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(
    rootReducer,
    middleware
);

sagaMiddleware.run(rootSaga);
export default store;
