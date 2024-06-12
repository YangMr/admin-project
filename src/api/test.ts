import request from '@/utils/request'

export const test = () => request({ url: '/public/test', method: 'GET' })
