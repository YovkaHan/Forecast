import {TYPES} from './types';
import {createReducer} from '../../../redux/common'

const INIT_STATE = {
    currentPage: 'main',
    currentCity: undefined,
    weather: {
        data: {},
        loading: false
    },
    lastSeenCities: [],
    forecast: {
        data: [],
        loading: false
    }
};

const cases = (type) => {
    switch (type) {
        case TYPES.PAGE_CHANGE: {
            return (draft, payload) => {
                draft.currentPage = payload.page;
            };
        }
        case TYPES.CURRENT_CITY_CHOOSE: {
            return draft => {
                draft.weather = {
                    data: draft.weather.data,
                    loading: true
                };
            };
        }
        case TYPES.CURRENT_CITY_CHOOSE_COMPLETE: {
            return (draft, payload) => {
                const {name, id} = payload.data;
                draft.currentCity = {name, id, country: payload.data.sys.country};
                if (!draft.lastSeenCities.find(city => city.id === id)) {
                    if (draft.lastSeenCities.length >= 5)
                        draft.lastSeenCities.shift();
                    draft.lastSeenCities.push({name, id, country: payload.data.sys.country});
                }
                draft.weather = {
                    data: payload.data,
                    loading: false
                };
            };
        }
        case TYPES.CURRENT_CITY_CHOOSE_ERROR: {
            return (draft, payload) => {
                draft.weather = {
                    data: payload.data,
                    loading: false
                };
            }
        }
        case TYPES.CURRENT_CITY_FORECAST: {
            return draft => {
                draft.forecast = {
                    data: draft.forecast.data,
                    loading: true
                };
            };
        }
        case TYPES.CURRENT_CITY_FORECAST_ERROR: {
            return (draft) => {
                draft.forecast = {
                    data: [],
                    loading: false
                };
            };
        }
        case TYPES.CURRENT_CITY_FORECAST_COMPLETE: {
            return (draft, payload) => {
                draft.forecast = {
                    data: payload.data,
                    loading: false
                }
            };
        }
        default : {
            return () => {
            }
        }
    }
};

const reducer = function (id) {
    return createReducer(cases, INIT_STATE, id);
};

export default reducer;
