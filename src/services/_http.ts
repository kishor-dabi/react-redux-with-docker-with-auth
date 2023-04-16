import axios, { RawAxiosRequestConfig } from 'axios'
const unInterceptedAxios = axios.create()
const baseURL = process.env.REACT_APP_API_BASE_URL
export const HttpRequest = (requestConfig: RawAxiosRequestConfig) => {
    return axios.request({ baseURL, ...requestConfig})
}
export const HttpBaseRequest = (requestConfig: RawAxiosRequestConfig) => {
    return unInterceptedAxios.request({ baseURL, ...requestConfig})
}
