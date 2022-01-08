import { ACCESS_TOKEN_KEY } from 'app-constants/commons';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { get, isArray } from 'lodash';
import qs from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => qs.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Attach auth token if needed
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
        config.headers = {
            Authorization: token,
        };
    }
    return config;
});

axiosClient.interceptors.response.use(
    // Process data if needed
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    // Process error if needed
    (error) => {
        const errorData = get(error, ['response', 'data']);
        if (errorData) {
            const detail = errorData.detail;
            if (typeof detail === 'string') {
                return Promise.reject(detail);
            }
            if (isArray(detail) && detail.length) {
                const { loc, msg } = detail[0];
                const formattedMsg = loc.join('->') + ' ' + msg;
                return Promise.reject(formattedMsg);
            }
            return Promise.reject('Unknown error');
        }
        return Promise.reject('Network error');
    },
);

export default async function request<T>(
    method: Method,
    url: string,
    data?: any,
): Promise<T> {
    const config: AxiosRequestConfig = {
        method,
        url,
    };

    if (method === 'GET' || method === 'get') {
        config.params = data;
    } else config.data = data;

    return (await axiosClient.request(config)) as T;
}
