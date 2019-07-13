import {all} from 'redux-saga/effects';

import App from '../components/App/redux/sagas';

export default function* rootSaga() {
    const sagas = [
        ...App,
    ];

    yield all(sagas)
}