import type { TableOptionsType } from '@/components/Table/types'
import { formatTime } from '@/utils/formatTime'
export const columnOptions: TableOptionsType[] = [
  {
    label: '角色id',
    prop: 'id',
    align: 'center'
  },
  {
    label: '角色名称',
    prop: 'rolename',
    align: 'center'
  },
  {
    label: '角色说明',
    prop: 'remark',
    align: 'center'
  },
  {
    label: '创建时间',
    prop: 'createdAt',
    align: 'center',
    formatter: (row: any, column: any, cellValue: any) => {
      return formatTime(cellValue)
    }
  },
  {
    label: '操作',
    action: true,
    width: 200,
    align: 'center'
  }
]
