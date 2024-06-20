export type RequestTrainListParamsType = {
  /**
   * 页码
   */
  pageNum?: string | number
  /**
   * 条数
   */
  pageSize?: string | number
  /**
   * 训练类型 1 课堂训练 2课后训练 3品格教育
   */
  type?: string | number
}

export type ResponseTrainListType = {
  list: List[]
  total: number
  [property: string]: any
}

export type List = {
  cover: string
  createdAt: string
  id: number
  intro: string
  name: string
  type: number
  updatedAt: string
  [property: string]: any
}
