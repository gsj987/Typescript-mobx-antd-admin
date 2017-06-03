import { Modal, message } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styles from './layer.less'
const { info, success, error, warning, confirm } = Modal

const layer_close = (index: any|undefined) => new Promise((resolve, reject) => {
  const { prefixCls } = layer
  let div: Element | HTMLElement | null;

  div = document.getElementById(`${prefixCls}-reference-${index}`)
  if (index === undefined) {
    const references = document.querySelectorAll(`.${prefixCls}-reference`)
    div = references[references.length - 1]
  }
  if (!div) {
    message.error('关闭失败，未找到Dom')
    return
  }
  const unmountResult = ReactDOM.unmountComponentAtNode(div)
  if (unmountResult && div.parentNode) {
    div.parentNode.removeChild(div)
    resolve(index)
  } else {
    reject(index)
  }
})

const layer_closeAll = () => {
  const { prefixCls } = layer
  const references = document.querySelectorAll(`.${prefixCls}-reference`)
  let i = 0
  while (i < references.length) {
    layer_close(undefined)
    i++
  }
}

const layer_open = (config) => {
  const props = Object.assign({}, config)
  const { content, ...modalProps } = props
  const { className, wrapClassName = '', verticalCenter = true } = modalProps
  const { prefixCls } = layer
  const index = layer.index++
  let div = document.createElement('div')
  div.id = `${prefixCls}-reference-${index}`
  div.className = `${prefixCls}-reference`
  document.body.appendChild(div)

  ReactDOM.render(
    <Modal
      visible
      title="Title"
      transitionName="zoom"
      maskTransitionName="fade"
      onCancel={() => {
        layer.close(index)
      }}
      onOk={() => {
        layer.close(index)
      }}
      {...modalProps}
      wrapClassName={classnames({ [styles.verticalCenter]: verticalCenter, [wrapClassName]: true })}
      className={classnames(prefixCls, className, [`${prefixCls}-${index}`])}
    >
      <div className={`${prefixCls}-body-wrapper`} style={{ maxHeight: document.body.clientHeight - 256 }}>
        {content}
      </div>
    </Modal>, div)

  return index
}


const layer = {
  prefixCls: 'ant-layer',
  index: 1,
  info,
  success,
  error,
  warning,
  confirm,
  close: layer_close,
  closeAll: layer_closeAll,
  open: layer_open
}



export { layer }
