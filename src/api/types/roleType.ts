export type ResponseRoleListType = {
  list: ListType[]
  total: number
  [property: string]: any
}

export type ListType = {
  createdAt: string
  id: number
  remark: string
  rolename: string
  updatedAt: string
  [property: string]: any
}

export type RoleParamsType = {
  pageNum: string | number
  pageSize: string | number
  rolename: string
}
