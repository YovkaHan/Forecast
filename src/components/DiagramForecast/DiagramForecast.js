import React from 'react';
import Chart from 'react-apexcharts';
import * as R from 'ramda';
import moment from "moment";

export default function DiagramForecast({className = '', data}) {

    const diagramData = [];

    data.some(item => {
        diagramData.push(item);
        return diagramData.length >= 8;
    });

    const options = {
        stroke: {
            width: [0, 2],
            colors: ['rgba(175, 166, 100, 0.62)', '#4141b7']
        },
        fill: {
            colors: ['rgba(175, 166, 100, 0.62)', '#4141b7']
        },
        dataLabels: {
            enabled: false
        },
        colors: ['rgba(175, 166, 100, 0.62)', '#4141b7'],
        legend: {
            show: false,
            showForSingleSeries: false,
            position: 'top',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '14px',
            fontFamily: 'Roboto, Arial',
            width: undefined,
            height: undefined,
            offsetX: 0,
            offsetY: 0,
            labels: {
                colors: ['rgba(175, 166, 100, 0.62)', '#4141b7']
            },
        },
        xaxis: {
            type: 'category',
            categories: diagramData.map(item => moment(item.dt * 1000).format('HH:mm'))
        },
        yaxis: [{
            title: {
                text: 'Temperature',
            },
            labels: {
                style: {
                    color: "rgba(175, 166, 100, 0.62)"
                },
                formatter: function (val, index) {
                    return val.toFixed(0);
                }
            }

        }, {
            opposite: true,
            style: {
                color: "#4141b7"
            },
            title: {
                text: 'Precipitation'
            }
        }]
    };
    const series = [
        {
            name: 'Temperature (°C)',
            type: 'column',
            data: diagramData.map(item => (item.main.temp - 273.15).toFixed(0))
        },
        {
            name: 'Precipitation (mm)',
            type: 'line',
            data: diagramData.map(item => R.path(['rain', '3h'], item) || R.path(['snow', '3h'], item) || 0)
        }];

    return (
        <div className={`c-diagram-forecast ${className}`.trim()}>
            <div className={'c-diagram-forecast__title'}>Daily forecast</div>
            <Chart
                className={'c-diagram-forecast__diagram'}
                options={options}
                series={series}
                type="line"
                height='350px'
            />
            <div className={'c-diagram-forecast__days'}>
                {
                    diagramData.map((item, i) => (
                        <div key={i} className={'c-diagram-forecast__day day'}>
                            <img className={'day__img'}
                                 src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                 alt={item.weather[0].icon}/>
                            <div className={'day__temp'}
                                 title={'Temperature'}>{(item.main.temp - 273.15).toFixed(0)} °C
                            </div>
                            <div className={'day__wind'} title={'Wind Speed'}>{item.wind.speed} m/s</div>
                            <div className={'day__pressure'}
                                 title={'Pressure'}>{(item.main.pressure * 100 / 133.322).toFixed(0)} mm Hg
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}