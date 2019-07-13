import axios from "axios";

const _SERVER = window.SERVER ? SERVER : 'https://';

export const getData = (api) => {
    return axios.get(`${_SERVER}${api}`).then(function (response) {
        return response.data;
    }).catch(error => {
        return {
            error
        };
    })
};

// export const postData = (api, data) => {
//     return axios.post(`${_SERVER}${api}`, data).then(function (response) {
//         return response.data;
//     }).catch(error => {
//         console.error(error);
//         return error;
//     })
// };
//
// export const putData = (api, data) => {
//     return axios.put(`${_SERVER}${api}`, data).then(function (response) {
//         return response.data;
//     }).catch(error => {
//         console.error(error);
//         return error;
//     })
// };
//
// export const deleteData = (api) => {
//     return axios.delete(`${_SERVER}${api}`).then(function (response) {
//         return response.data;
//     }).catch(error => {
//         console.error(error);
//         return error;
//     })
// };