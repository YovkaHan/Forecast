import {takeEvery, put, call, delay} from 'redux-saga/effects'
import {TYPES} from "./types";
import * as R from 'ramda';
import {getData} from '../../../common/lib';

function getCurrentWeather(city) {
    return getData(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`);
}

function getCurrentForecast(city, country) {
    return getData(`api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${appid}`);
}

export default [
    takeEvery(TYPES.CURRENT_CITY_CHOOSE, currentCityChooseSaga)
];


function* currentCityChooseSaga({payload}) {
    const {name} = payload;

    const weather = yield call(getCurrentWeather, name);

    yield delay(1000);

    if(!weather.hasOwnProperty('error')){
        yield put({type: TYPES.CURRENT_CITY_CHOOSE_COMPLETE, payload: {data: weather}});

    } else {
        yield put({type: TYPES.CURRENT_CITY_CHOOSE_ERROR, payload: {data: weather}});
    }

    yield put({type: TYPES.CURRENT_CITY_FORECAST});
    yield delay(1000);

    const forecast = yield call(getCurrentForecast, R.path(['name'], weather) ? weather.name : name, R.path(['sys', 'country'], weather) ? weather.sys.country : '');

    if(!forecast.hasOwnProperty('error')){
        yield put({type: TYPES.CURRENT_CITY_FORECAST_COMPLETE, payload: {data: forecast.list}});
    } else {
        yield put({type: TYPES.CURRENT_CITY_FORECAST_ERROR, payload: {data: forecast}});
    }
}

