import { all } from 'redux-saga/effects';
import { fetchCompanyInfoSaga, fetchCompanyInfoWatcher, fetchSettingsSaga, fetchSettingsWatcher } from './adminSagas';

function* rootSaga(){
    yield all([
        fetchCompanyInfoWatcher,
        fetchSettingsWatcher,
        fetchCompanyInfoSaga,
        fetchSettingsSaga
    ]);
}

export default rootSaga;
