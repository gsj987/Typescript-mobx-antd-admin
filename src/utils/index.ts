import config from './config'
import menu from './menu'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'

import './dateExtenions'
import './stringExtenions'


const queryURL = (name:string): string => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return ''
}

export {
  config,
  menu,
  request,
  color,
  classnames,
  queryURL
}
