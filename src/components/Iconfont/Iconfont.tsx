import React, { PropTypes } from 'react'
import './iconfont.less'


const Iconfont = ({ type, className }) => <span
  className={className}
  dangerouslySetInnerHTML={{
    __html: `<svg class="iconfont" aria-hidden="true"><use xlink:href="#anticon-${type}"></use></svg>`,
  }}
/>


export { Iconfont }
