import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { RequestConfig, RequestInterceptors } from './type'

class Request {
	instance: AxiosInstance

	interceptorsObj?: RequestInterceptors
	constructor(initConfig: RequestConfig) {
		this.interceptorsObj = initConfig.interceptors
		this.instance = axios.create(initConfig)
		if (initConfig.interceptors) {
			this.instance.interceptors.request.use(initConfig.interceptors?.requestInterceptors, initConfig.interceptors?.requestInterceptorsCatch)
			this.instance.interceptors.response.use(initConfig.interceptors?.responseInterceptors, initConfig.interceptors?.responseInterceptorsCatch)
		}

		// 请求拦截
		this.instance.interceptors.request.use(
			config => {
				return config
			},
			err => err
		)
		// 响应拦截
		this.instance.interceptors.response.use(
			res => {
				return res.data
			},
			err => {
				return err
			}
		)
	}

	request<T>(config: RequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			// 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
			if (config.interceptors?.requestInterceptors) {
				config = config.interceptors.requestInterceptors(config)
			}
			this.instance
				.request<any, T>(config)
				.then(res => {
					// 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
					if (config.interceptors?.responseInterceptors) {
						// @ts-ignore
						res = config.interceptors.responseInterceptors<T>(res)
					}

					resolve(res)
				})
				.catch((err: any) => {
					reject(err)
				})
		})
	}
}

export default Request
