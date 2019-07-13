import React from 'react';
import moment from 'moment';
import * as R from 'ramda';

import {WindArrow} from '../../components';

export default function TableForecast({data = {}, className = ''}) {
    const dataToDisplay = {};

    data.map(item => {
        const date = moment(item.dt * 1000);
        const key = date.format('YYYY-MM-DD');
        if(dataToDisplay.hasOwnProperty(key)){
            dataToDisplay[key].push(item);
        } else {
            dataToDisplay[key] = [item];
        }
    });

    return (
        <div className={`c-table-forecast ${className}`}>
            <div className={'c-table-forecast__head'}>
                <div className={'row'}>
                    <div className={'c-table-forecast-head__day row__item row__item--day'}>Day</div>
                    <div className={'c-table-forecast-head__time row__item row__item--time'}>Time</div>
                    <div
                        className={'c-table-forecast-head__temperature row__item row__item--temperature'}>temperature
                    </div>
                    <div className={'c-table-forecast-head__img row__item row__item--img'}>Weather</div>
                    <div
                        className={'c-table-forecast-head__precipitation row__item row__item--precipitation'}>Precipitation
                    </div>
                    <div className={'c-table-forecast-head__humidity row__item row__item--humidity'}>humidity</div>
                    <div className={'c-table-forecast-head__pressure row__item row__item--pressure'}>pressure</div>
                    <div className={'c-table-forecast-head__wind row__item row__item--wind'}>wind</div>
                </div>
            </div>
            <div className={'c-table-forecast__body'}>
                {Object.keys(dataToDisplay).map(key => <TableForecastItem key={key} data={dataToDisplay[key]} date={key}/>)}
            </div>
        </div>
    );
}

function TableForecastItem({data = [], date = "2019-07-11 15:00:00"}) {
    return (
        <div className={'c-table-forecast-item row'}>
            <div className={'c-table-forecast-item__date'}>
                <div className={'c-table-forecast-item__day row__item row__item--day'}>{date}</div>
            </div>
            <div className={'c-table-forecast-item__details'}>
                {
                    data.map((item, i) => (
                        <div key={i} style={{display: 'flex'}}>
                            <div
                                className={'c-table-forecast-item__time row__item row__item--time'}>{moment(item.dt * 1000).format('HH:mm:ss')}</div>
                            <div
                                className={'c-table-forecast-item__temperature row__item row__item--temperature'}> {(item.main.temp - 273.15).toFixed(0)} °C
                            </div>
                            <div className={'c-table-forecast-item__img row__item row__item--img'}>
                                <img className={'city-weather__image'}
                                     src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                     alt={item.weather[0].icon}/>
                            </div>
                            <div
                                className={'c-table-forecast-item__precipitation row__item row__item--precipitation'}>{R.path(['rain', '3h'], item) || R.path(['snow', '3h'], item) ? (R.path(['rain', '3h'], item) || R.path(['snow', '3h'], item)) + ' mm' : '-'}</div>
                            <div
                                className={'c-table-forecast-item__humidity row__item row__item--humidity'}>{item.main.humidity} %
                            </div>
                            <div
                                className={'c-table-forecast-item__pressure row__item row__item--pressure'}>{(item.main.pressure * 100 / 133.322).toFixed(0)} mm Hg
                            </div>
                            <div className={'c-table-forecast-item__wind row__item row__item--wind'}>
                                <WindArrow deg={item.wind.deg}/> {item.wind.speed} m/s
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}