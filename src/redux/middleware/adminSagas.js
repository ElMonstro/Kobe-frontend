import { takeLatest, put, call } from 'redux-saga/effects';
import AdminService from '../../services/adminService';
import { setCompanyInfo, setSettings } from '../actions';
import { FETCH_COMPANY_INFO, FETCH_SETTINGS } from '../actions/actionTypes';

export function* fetchSettingsWatcher() {
    yield takeLatest (FETCH_SETTINGS, fetchSettingsSaga);
}

export function* fetchSettingsSaga() {
    try {
        console.log("saga")
        const {data} = yield call(AdminService.fetchSettings);
        yield put(setSettings(data));
    } catch (error) {
        console.log(error);
    }
}

export function* fetchCompanyInfoWatcher() {
    yield takeLatest (FETCH_COMPANY_INFO, fetchCompanyInfoSaga);
}

export function* fetchCompanyInfoSaga() {
    try {
        const {data} = yield call(AdminService.fetchCompanyInfo);
        yield put(setCompanyInfo(data));
    } catch (error) {
        console.log(error);
    }
}
