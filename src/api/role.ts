import request from '@/utils/request'
import type { ResponseRoleListType, RoleParamsType } from './types/roleType'

/**
 *
 * @param data 获取角色列表
 * @returns
 */
export const getRoleList = (data: RoleParamsType) => {
  return request<ResponseRoleListType>({ url: '/role/list', method: 'GET', data })
}
