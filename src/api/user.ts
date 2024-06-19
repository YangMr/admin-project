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

/**
 * 删除用户接口
 * @param id
 * @returns
 */
export const deleteUser = (id: number) => {
  return request<null>({ url: '/user/delete', method: 'GET', data: { id } })
}

/**
 * 重置密码
 * @param id
 * @param password
 * @returns
 */
export const resetPass = (id: number | string, password: number | string) => {
  return request<null>({ url: '/user/resetPwd', method: 'POST', data: { id, password } })
}
