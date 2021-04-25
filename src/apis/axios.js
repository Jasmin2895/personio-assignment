import axios from 'axios';
import { PERSONIO_ENDPOINT } from '../constants/index';

const beforeRequest = (config) => {
    let headers = {};
    let defaultHeaders = config.headers;
    // if (config && config.url != '/api/v1/login') {
    //     headers['Authorization'] = `Bearer ${getCookie(
    //         'auth-token',
    //     )}`;
    // }

    // const currentTime = new Date().getTime();

    config.headers = { ...headers, ...defaultHeaders };

    return config;
};

const createAxios = (baseURL) => {
    const axiosInstance = axios.create({
        baseURL,
    });
    axiosInstance.interceptors.request.use(
        (config) => {
            return beforeRequest ? beforeRequest(config) : config;
        },
        (error) => Promise.reject(error),
    );

    axiosInstance.interceptors.request.use(
        (response) => response,
        (error) => {
            const status = error.response?.status;
            if (status === 401) {
                // remove cookie
            } else if (status >= 403) {
                console.error(
                    `Backend Error [${error.response.status}] with API:`,
                    error,
                );
            }
        },
    );

    return axiosInstance;
};

export const personioApiInstance = createAxios(PERSONIO_ENDPOINT);
