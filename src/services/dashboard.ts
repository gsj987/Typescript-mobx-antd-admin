import { request, config } from '../utils'
const { api } = config
const { dashboard } = api

export function myCity (params): Promise<any> {
  return request({
    url: 'http://www.zuimeitianqi.com/zuimei/myCity',
    data: params,
  })
}

export function queryWeather (params): Promise<any> {
  return request({
    url: 'http://www.zuimeitianqi.com/zuimei/queryWeather',
    data: params,
  })
}

export function query (params): Promise<any> {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}
