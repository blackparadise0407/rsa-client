import axios, { AxiosRequestConfig, Method } from 'axios';
import qs from 'query-string';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => qs.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Attach auth token if needed
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
        throw error;
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
