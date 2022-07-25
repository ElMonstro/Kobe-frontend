import { all } from 'redux-saga/effects';
import { fetchCompanyInfoWatcher, fetchSettingsWatcher } from './adminSagas';

function* rootSaga(){
    yield all([
        fetchCompanyInfoWatcher,
        fetchSettingsWatcher,
    ]);
}

export default rootSaga;
