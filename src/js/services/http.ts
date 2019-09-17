import axios from 'axios';
import store from '../store';
import * as CONSTANTS from '../constants';

const http = axios.create({
    'baseURL': CONSTANTS.ENDPOINTS.API_ENDPOINT,
    'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    'timeout': 10000,
    'withCredentials': false
});

http.interceptors.request.use(config => {
    store.commit('loader/START_LOADING');
    return config;
}, error => {
    store.commit('loader/FINISH_LOADING');
    return Promise.reject(error);
});

http.interceptors.response.use(response => {
    store.commit('loader/FINISH_LOADING');
    return response;
}, error => {
    store.commit('loader/FINISH_LOADING');
    return Promise.reject(error);
});

export default http;
