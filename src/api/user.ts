import request from '@/utils/request'
import type {
  ResponseUpdateUserType,
  ResponseUserListType,
  SearchUserParamsType,
  UpdateUserType
} from './types/userType'

/**
 * 获取用户列表接口
 * @param data
 * @returns
 */
export const getUserList = (data: SearchUserParamsType) => {
  return request<ResponseUserListType>({ url: '/user/list', method: 'GET', data })
}

/**
 * 编辑用户接口
 * @param data
 * @returns
 */
export const updateUser = (data: UpdateUserType) => {
  return request<ResponseUpdateUserType>({ url: '/user/update', method: 'POST', data })
}
