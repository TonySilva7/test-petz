import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios, { AxiosInstance } from 'axios';

/**
 * Request Success Handler
 */
const requestSuccessHandler = (config: InternalAxiosRequestConfig) => {
  // add token and continue
  const token = localStorage.getItem('token');

  if (token && config.headers && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * Request Fail Handler
 */
const requestErrorHandler = (err: AxiosError) => {
  return Promise.reject(err);
};

/**
 * Response Success Handler
 */
const responseSuccessHandler = (res: AxiosResponse) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    return responseErrorHandler(res);
  }
};

/**
 * Response Fail handler
 */
const responseErrorHandler = (err: AxiosResponse) => {
  return Promise.reject(err);
};

/**
 * Function to create Axios instance with a given base URL
 */
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => requestSuccessHandler(config),
    (err: AxiosError) => requestErrorHandler(err),
  );

  instance.interceptors.response.use(
    (res) => responseSuccessHandler(res),
    (err: AxiosResponse) => responseErrorHandler(err),
  );

  return instance;
};

// Create Axios instances for each API
const api1BaseUrl = process.env.API1_URL as string;
const api2BaseUrl = process.env.API2_URL as string;

const api1Http = createAxiosInstance(api1BaseUrl);
const api2Http = createAxiosInstance(api2BaseUrl);

export { api1Http, api2Http };
