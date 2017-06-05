import React, { PropTypes } from 'react'
import { Table, Tag } from 'antd'
import styles from './recentSales.less'
import { color } from '../../../utils'
import { IColumn } from '../../../typings/tables'

const status = {
  1: {
    color: color.green,
    text: 'SALE',
  },
  2: {
    color: color.yellow,
    text: 'REJECT',
  },
  3: {
    color: color.red,
    text: 'TAX',
  },
  4: {
    color: color.blue,
    text: 'EXTENDED',
  },
}

class RTable extends Table<any> {}

function RecentSales ({ data }) {
  const columns: Array<IColumn> = [
    {
      title: 'NAME',
      dataIndex: 'name',
    }, {
      title: 'STATUS',
      dataIndex: 'status',
      render: (text,_) => <Tag color={status[text].color}>{status[text].text}</Tag>,
    }, {
      title: 'DATE',
      dataIndex: 'date',
      render: (text,_) => <span>{new Date(text).format('yyyy-MM-dd')}</span>,
    }, {
      title: 'PRICE',
      dataIndex: 'price',
      render: (text, it) => <span style={{ color: status[it.status].color }}>${text}</span>,
    },
  ]
  return (
    <div className={styles.recentsales}>
      <RTable pagination={false} columns={columns} rowKey={(record, key) => key.toString()} dataSource={data.filter((item, key) => key < 5)} />
    </div>
  )
}

export { RecentSales }
