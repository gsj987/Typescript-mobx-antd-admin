import { request, config } from '../utils'
const { api } = config
const { userInfo, userLogout } = api

export function login (params: any): Promise<any> {
  return request({
    url: '/api/login',
    method: 'post',
    data: params,
  })
}

export function logout (params): Promise<any> {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export function getUserInfo (params): Promise<any> {
  return request({
    url: userInfo,
    method: 'get',
    data: params,
  })
}
