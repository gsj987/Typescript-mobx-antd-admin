import React, { PropTypes } from 'react'
import { Icon, Card } from 'antd'
import CountUp from 'react-countup'
import styles from './numberCard.less'


interface IProps {
  icon: string,
  color: string,
  title: string,
  number: number,
  countUp: any
}

function NumberCard ({ icon, color, title, number, countUp }: IProps) {
  return (
    <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
      <Icon className={styles.iconWarp} style={{ color }} type={icon} />
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...countUp || {}}
          />
        </p>
      </div>
    </Card>
  )
}


export { NumberCard }
