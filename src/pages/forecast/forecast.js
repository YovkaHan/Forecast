import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {TableForecast, Loading} from '../../components';

class ForecastPage extends React.Component {
    static defaultProps = {
        forecastData: [],
        currentCity: {
            name: '',
            country: ''
        }
    };

    constructor(props) {
        super(props);

        if (!Object.keys(props.forecastData).length && !props.forecastLoading) {
            props.history.push('/main');
        }
    }

    render() {
        const {forecastData, forecastLoading, currentCity} = this.props;
        return (
            <section className={'the-app__page forecast-page'}>
                <div className={'forecast-page__title'}>
                    <Link to="/main" className={'forecast-page__back go-back'}>
                        <button className={'go-back__btn'}>Go Back</button>
                    </Link>
                    <h3 className={'forecast-page__city'}>{currentCity.name}, {currentCity.country}</h3>
                </div>
                <div className={'forecast-page__table-container'}>
                    {
                        forecastLoading ?
                            <Loading loading className={'forecast-page__loading'}/> :
                            <TableForecast data={forecastData}/>
                    }
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, props) => {
    const AppState = state.App;
    return {
        currentCity: AppState.currentCity,
        forecastData: AppState.forecast.data,
        forecastLoading: AppState.forecast.loading
    };
};

export default connect(mapStateToProps, undefined)(ForecastPage);