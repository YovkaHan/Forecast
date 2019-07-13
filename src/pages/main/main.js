import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {MdSearch} from 'react-icons/md';
import {Loading, DiagramForecast} from '../../components';
import {HumidityIcon, PressureIcon, TemperatureIcon, ArrowIcon, WeatherIcon} from '../../common/icons';
import {changePage, currentCityChoose} from '../../components/App/redux/actions';

class MainPage extends React.Component {
    static defaultProps = {
        lastSeenCities: [],
        cityWeatherLoading: false,
        forecastLoading: false
    };

    constructor(props) {
        super(props);

        this.state = {
            city: ''
        }
    }

    cityWhetherChoose = (city) => {
        this.props.currentCityChoose(city ? city : this.state.city);
    };

    handleKeyPress = (e) => {
        if (e.charCode == 13) {
            this.props.currentCityChoose(this.state.city);
        }
    };

    componentDidUpdate(prevProps) {
        if(prevProps.cityWeatherLoading !== this.props.cityWeatherLoading && !this.props.cityWeatherLoading){
            this.setState({city: ''});
        }
    }

    render() {

        const {lastSeenCities, cityWeather, goToCityForecast, cityWeatherLoading, forecastLoading, forecastData} = this.props;
        const {city} = this.state;
        return (
            <section className={'the-app__page main-page'}>
                <div className={'main-page__block'}>
                    <div className={'main-page-search'}>
                        <input
                            type="text"
                            className={'main-page-search__text'}
                            value={city}
                            onChange={(e) => this.setState({city: e.target.value})}
                            placeholder={'Input city'}
                            tabIndex={0}
                            onKeyPress={this.handleKeyPress}
                        />
                        <Loading loading
                                 className={`main-page-search__loading ${cityWeatherLoading && city.length ? '' : 'main-page-search__loading--hidden'}`}/>
                        <button className={'main-page-search__btn'} onClick={() => this.cityWhetherChoose()}><MdSearch/>
                        </button>
                    </div>
                    <div className={`last-seen ${lastSeenCities.length ? '' : 'last-seen--hidden'}`}>
                        <div className={'last-seen__title'}>Last seen</div>
                        <div className={'last-seen__list'}>
                            {
                                lastSeenCities.map(item => (
                                    <div
                                        key={item.id}
                                        className={'last-seen__city'}
                                        onClick={() => this.cityWhetherChoose(`${item.name},${item.country}`)}
                                    >
                                        {item.name}, {item.country}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={'main-page__block main-page__block--side'}>
                    {
                        Object.keys(cityWeather).length ? (
                            <div className={'city-weather'}>
                                <div className={`city-weather__overlay ${cityWeatherLoading ? '' : 'city-weather__overlay--hidden'}`}></div>
                                {
                                    cityWeather.hasOwnProperty('weather') ? (
                                        <div className={'city-weather__main'}>
                                            <div className={'city-weather__block'}>
                                                <WeatherIcon
                                                    code={cityWeather.weather[0].id}
                                                    isDay={(cityWeather.dt + cityWeather.timezone) > cityWeather.sys.sunrise}
                                                    className={'city-weather__weather'}
                                                />
                                                <div className={'city-weather__title'}>
                                                    {`${cityWeather.name}, ${cityWeather.sys.country}`}
                                                </div>
                                            </div>
                                            <div className={'city-weather__block'}>
                                                <div className={'city-weather__subblock city-weather__temperature'}
                                                     title={'Temperature'}>
                                                    <TemperatureIcon className={'icon'}/>
                                                    <div>{(cityWeather.main.temp - 273.15).toFixed(0)} °C</div>
                                                </div>
                                                <div className={'city-weather__subblock city-weather__pressure'}
                                                     title={'Pressure'}>
                                                    <PressureIcon className={'icon'}/>
                                                    <div>{(cityWeather.main.pressure * 100 / 133.322).toFixed(0)} mm
                                                        Hg
                                                    </div>
                                                </div>
                                                <div className={'city-weather__subblock city-weather__wind'}
                                                     title={'Wind'}>
                                                    <ArrowIcon className={'icon'} deg={cityWeather.wind.deg}/>
                                                    <div>{cityWeather.wind.speed} m/s</div>
                                                </div>
                                                <div className={'city-weather__subblock city-weather__humidity'}
                                                     title={'Humidity'}>
                                                    <HumidityIcon className={'icon'}/>
                                                    <div>{cityWeather.main.humidity} %</div>
                                                </div>
                                            </div>
                                            <Link to="/forecast">
                                                <button className={'city-weather__forecast'}
                                                        onClick={goToCityForecast}>Detailed Forecast
                                                </button>
                                            </Link>
                                        </div>
                                    ) : null
                                }
                                {
                                    cityWeather.hasOwnProperty('error') ? (
                                        <div className={`city-weather__no-item`}>No Items :(</div>
                                    ) : null
                                }
                                {
                                    cityWeatherLoading ? (
                                        <Loading loading className={`city-weather__loading`}/>
                                    ) : null
                                }
                            </div>
                        ) : null
                    }
                    {
                        forecastData.length ? (
                            <div className={`city-weather-diagram`}>
                                <div className={`city-weather-diagram__overlay ${forecastLoading ? '' : 'city-weather-diagram__overlay--hidden'}`}></div>
                                <DiagramForecast data={forecastData}/>
                                {
                                    forecastLoading ? (
                                        <Loading loading className={`city-weather-diagram__loading`}/>
                                    ) : null
                                }
                            </div>
                        ) : null
                    }
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, props) => {
    const AppState = state.App;
    return {
        lastSeenCities: AppState.lastSeenCities,
        cityWeather: AppState.weather.data,
        cityWeatherLoading: AppState.weather.loading,
        forecastData: AppState.forecast.data,
        forecastLoading: AppState.forecast.loading
    };
};

const mapDispatchers = (dispatch, props) => {
    return bindActionCreators({
        goToCityForecast: () => changePage('forecast'),
        currentCityChoose: (city) => currentCityChoose(city)
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchers)(MainPage);