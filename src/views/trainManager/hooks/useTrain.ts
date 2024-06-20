import { getTrainList } from '@/api/train'
import type { List, RequestTrainListParamsType } from '@/api/types/trainType'

export const useTrain = (type: number | string) => {
  const list = ref<List[]>([])
  const query = reactive<RequestTrainListParamsType>({
    pageNum: 1,
    pageSize: 10,
    type
  })
  const total = ref<number>(0)

  const initList = async () => {
    try {
      const res = await getTrainList(query)
      list.value = res.data.list
      total.value = res.data.total
    } catch (error) {
      console.log(error)
    }
  }

  const replaceCoverUrl = (url: string) => {
    return url.replace('http://192.168.1.5:3000', import.meta.env.VITE_APP_BASE_URL)
  }

  const handleSizeChange = (size: number) => {
    query.pageSize = size
    initList()
  }
  const handleCurrentChange = (page: number) => {
    query.pageNum = page
    initList()
  }

  return {
    list,
    total,
    query,
    initList,
    replaceCoverUrl,
    handleSizeChange,
    handleCurrentChange
  }
}
