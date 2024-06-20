import request from '@/utils/request'
import type { RequestTrainListParamsType, ResponseTrainListType } from './types/trainType'

// 获取训练接口
export const getTrainList = (data: RequestTrainListParamsType) => {
  return request<ResponseTrainListType>({ url: '/train/list', method: 'GET', data })
}
