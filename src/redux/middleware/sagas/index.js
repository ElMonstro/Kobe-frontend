import { all } from 'redux-saga/effects';
import {fetchSettingsWatcher } from './adminSagas';

function* rootSaga(){
    yield all([
        fetchSettingsWatcher
    ]);
}

export default rootSaga;
