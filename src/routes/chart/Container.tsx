import React, { PropTypes } from 'react'
import styles from './Container.less'
import { ResponsiveContainer } from 'recharts'


interface IProps {
  children: JSX.Element | string,
  ratio?: number,
  minHeight?: number,
  maxHeight?: number
}

const Container = ({ children, ratio = 5 / 2, minHeight = 250, maxHeight = 350 }: IProps) => (
  <div className={styles.container} style={{ minHeight, maxHeight }}>
    <div style={{ marginTop: `${100 / ratio}%` || '100%' }}></div>
    <div className={styles.content} style={{ minHeight, maxHeight }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  </div>
)

export { Container }
