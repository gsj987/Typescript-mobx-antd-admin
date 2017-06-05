import React, { PropTypes } from 'react'
import { Table, Tag } from 'antd'
import styles from './browser.less'
import { color } from '../../../utils'
import { IColumn } from '../../../typings/tables'

const status = {
  1: {
    color: color.green,
  },
  2: {
    color: color.red,
  },
  3: {
    color: color.blue,
  },
  4: {
    color: color.yellow,
  },
}

interface IData {
  name: string,
  percent: string,
  status: number
}

interface IProps {
  data: Array<IData>
}

class BTable extends Table<IData> {}


function Browser ({ data }: IProps) {
  const columns: Array<IColumn> = [
    {
      title: 'name',
      dataIndex: 'name',
      className: styles.name,
    }, {
      title: 'percent',
      dataIndex: 'percent',
      className: styles.percent,
      render: (text, it) => <Tag color={status[it.status].color}>{text}%</Tag>,
    },
  ]
  return <BTable
    pagination={false}
    showHeader={false}
    columns={columns}
    rowKey={(record: IData, key: number) => key.toString()}
    dataSource={data} />
}


export { Browser }
