import { timeout } from "@/utils/promise.helper";
import axios, {
    AxiosError,
    AxiosResponse,
   type AxiosRequestConfig
} from "axios";
import * as rax from "retry-axios";
import { services } from ".";
const axiosIntance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: import.meta.env.VITE_REQUEST_TIMEOUT
});

// please keep version axios is 0.27.2 because it's compatible with lib retry-axios
axiosIntance.defaults.raxConfig = {
    instance: axiosIntance
};
rax.attach(axiosIntance);

axiosIntance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = 'abc';
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosIntance.interceptors.response.use(
    (respone) => handleRequestResponse(respone.data),
    (error) => handleRequestError(error)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRequestResponse = (data: any): any => {
    return data;
}

interface MyAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}
const handleRequestError = async (error: AxiosError): Promise<void> => {
    const config: MyAxiosRequestConfig = error.config || {};
    if (error.response?.status == 401 && !config._retry) {
        // handle is here
        const controller = new AbortController();
        const { signal } = controller;
        config._retry = true;
        // refresh token
        const oldToken = '111'
        if (oldToken) {
            services.auth.refreshToken('abcxyz')
        } else services.auth.logout()
        return await timeout(import.meta.env.VITE_REQUEST_TIMEOUT, signal, () =>
        axiosIntance(config)
      );  
    } else if (error.code) {
        throw new axios.Cancel("Operation canceled by sesstion timeout.");
    }
    return Promise.reject(error);
};


export function transformRequest<T>(
    config: AxiosRequestConfig
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<[null, T] | [AxiosError<unknown, any>, null]> {
    return axiosIntance.request(config).then(
      (val: AxiosResponse<T>) => [null, val || val] as unknown as [null, T],
      (err: AxiosError) => [err, null] as [AxiosError, null]
    );
  }