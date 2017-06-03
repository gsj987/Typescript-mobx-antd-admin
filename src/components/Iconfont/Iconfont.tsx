import React, { PropTypes } from 'react'
import './iconfont.less'


const Iconfont = ({ type }) => <span
  dangerouslySetInnerHTML={{
    __html: `<svg class="iconfont" aria-hidden="true"><use xlink:href="#anticon-${type}"></use></svg>`,
  }}
/>


export { Iconfont }
