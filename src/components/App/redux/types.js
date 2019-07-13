import {actionTemplate} from '../../../redux/common';

export const name = 'app';

const defaultTypes = {
    PAGE_CHANGE: "PAGE_CHANGE",
    CURRENT_CITY_CHOOSE: "CURRENT_CITY_CHOOSE",
    CURRENT_CITY_CHOOSE_ERROR: "CURRENT_CITY_CHOOSE_ERROR",
    CURRENT_CITY_CHOOSE_COMPLETE: "CURRENT_CITY_CHOOSE_COMPLETE",
    CURRENT_CITY_FORECAST: "CURRENT_CITY_FORECAST",
    CURRENT_CITY_FORECAST_ERROR: "CURRENT_CITY_FORECAST_ERROR",
    CURRENT_CITY_FORECAST_COMPLETE: "CURRENT_CITY_FORECAST_COMPLETE"
};

const _sequence = ["name","root"];

const _template = {
    name: name.toUpperCase(),
    root: {...defaultTypes}
};

const foo = (() =>{
    return actionTemplate(_sequence, _template, '__');
})();

export const TYPES = foo;
