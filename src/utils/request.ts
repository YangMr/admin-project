import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

// 创建axios实例
const service: AxiosInstance = axios.create({
  //   baseURL: 'http://serverqn.9yuecloud.com',
  //   baseURL: '/api',
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

type ResponseDataType<T = any> = {
  code: number
  msg: string
  data: T
}

// 完整请求的方法
const request = <T = any>(options: AxiosRequestConfig) => {
  return service.request<T, ResponseDataType<T>>({
    ...options,
    [options.method === 'GET' ? 'params' : 'data']: options.data
  })
}

// GET
export const get = <T = any>(url: string, data: Object) => {
  return request<T>({ url, method: 'GET', data })
}

// POST
export const post = <T = any>(url: string, data: Object) => {
  return request<T>({ url, method: 'POST', data })
}

// PUT
export const put = <T = any>(url: string, data: Object) => {
  return request<T>({ url, method: 'PUT', data })
}

// DELETE
export const del = <T = any>(url: string, data: Object) => {
  return request<T>({ url, method: 'DELETE', data })
}

// 导出axios实例对象
export default request
