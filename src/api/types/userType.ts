export type SearchUserParamsType = {
  /**
   * 页码
   */
  pageNum: string | number
  /**
   * 条数
   */
  pageSize: string | number
  /**
   * 用户名
   */
  username?: string
}

export type ResponseUserListType = {
  list: List[]
  total: number
}

export type List = {
  age?: number
  createdAt?: string
  deviceid?: string
  firm?: Firm
  gender?: number
  grade?: string
  id?: number
  num?: number
  phone?: string
  province?: string
  role?: Role
  school?: string
  status?: number
  type?: number
  updatedAt?: string
  username?: string
}

export type Firm = {
  addr: string
  createdAt: string
  id: number
  name: string
  updatedAt: string
}

export type Role = {
  createdAt: string
  id: number
  remark: string
  rolename: string
  updatedAt: string
}

export type UpdateUserType = {
  age: string
  gender: number
  grade: string
  id: number
  num: string
  phone: string
  province: string
  roleId: number
  school: string
  [property: string]: any
}

export type ResponseUpdateUserType = {
  affected: number
  generatedMaps: string[]
  raw: string[]
}
