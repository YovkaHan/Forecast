import {TYPES} from './types';

export function changePage(nextPage) {
    return {type: TYPES.PAGE_CHANGE, payload: {page: nextPage}};
}

export function currentCityChoose(cityName) {
    return {type: TYPES.CURRENT_CITY_CHOOSE, payload: {name: cityName}};
}

export default {
    changePage,
    currentCityChoose
}