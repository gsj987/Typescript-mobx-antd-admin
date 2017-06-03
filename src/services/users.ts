import { request, config } from '../utils'
const { api } = config
const { users } = api

export function query (params): Promise<any> {
  return request({
    url: users,
    method: 'get',
    data: params,
  })
}

export function create (params): Promise<any> {
  return request({
    url: users,
    method: 'post',
    data: params,
  })
}

export function remove (params): Promise<any> {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}

export function update (params): Promise<any> {
  return request({
    url: users,
    method: 'put',
    data: params,
  })
}
