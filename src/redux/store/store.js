import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './../reducer';
import rootSaga from './../middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { take } from 'redux-saga/effects'


function* logActions() {
    while (true) {
      const action = yield take() // correct
      console.log(action)
    }
  }

const sagaMiddleware = createSagaMiddleware();
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(
    rootReducer,
    middleware
);

sagaMiddleware.run(rootSaga);

export default store;
