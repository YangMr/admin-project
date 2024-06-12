import request from '@/utils/request'
import type { LoginDataType } from './types/loginType'

/**
 * 登录接口
 * @param data
 * @returns
 */
export const login = (data: LoginDataType) => {
  return request<string>({ url: '/user/login', method: 'POST', data })
}
