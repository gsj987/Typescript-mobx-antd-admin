import React, { PropTypes } from 'react'
import styles from './weather.less'

interface IProps {
  city: string,
  icon: string,
  dateTime: string,
  temperature: string,
  name: string
}

function Weather ({ city, icon, dateTime, temperature, name }: IProps) {
  return (<div className={styles.weather}>
    <div className={styles.left}>
      <div className={styles.icon} style={{
        backgroundImage: `url(${icon})`,
      }} />
      <p>{name}</p>
    </div>
    <div className={styles.right}>
      <h1 className={styles.temperature}>{`${temperature}°`}</h1>
      <p className={styles.description}>{city},{dateTime}</p>
    </div>
  </div>)
}

export { Weather }
