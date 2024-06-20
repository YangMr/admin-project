export interface TableOptionsType {
  type?: string
  // 表头要渲染的字段名称
  prop?: string
  // 表头名称
  label?: string
  // 是否是操作项
  action?: boolean
  // 宽度
  width?: number | string
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  // 是否开启插槽
  slot?: string
  // 格式化方法
  formatter?: Function
}
