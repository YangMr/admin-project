import type { TableOptionsType } from '@/components/Table/types'

export const columnOptions: TableOptionsType[] = [
  {
    label: '角色id',
    prop: 'id'
  },
  {
    label: '角色名称',
    prop: 'rolename'
  },
  {
    label: '角色说明',
    prop: 'remark'
  },
  {
    label: '创建时间',
    prop: 'createdAt'
  }
]
