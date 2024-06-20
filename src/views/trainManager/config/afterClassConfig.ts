import type { TableOptionsType } from '@/components/Table/types'

export const columnOptions: TableOptionsType[] = [
  {
    label: '标题',
    prop: 'name'
  },
  {
    label: '封面',
    prop: 'cover',
    slot: 'cover'
  },
  {
    label: '说明',
    prop: 'intro'
  },
  {
    label: '操作',
    action: true
  }
]
