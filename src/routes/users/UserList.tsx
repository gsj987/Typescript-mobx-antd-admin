import React, { PropTypes } from 'react'
import { Table, Modal } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'
import styles from './UserList.less'
import classnames from 'classnames'
import { AnimTableBody } from '../../components/DataTable/AnimTableBody'
import { DropOption } from '../../components'
import { IColumn } from '../../typings/tables'
import { IUser } from '../../models/users'

const confirm = Modal.confirm

export interface IProps {
  loading: boolean,
  dataSource: Array<any>,
  pagination: PaginationProps,
  onPageChange: (pagination: PaginationProps, filters: string[], sorter: Object) => any,
  onDeleteItem: (id: number) => void,
  onEditItem: (record: any) => void,
  isMotion: boolean,
  location: Location
}

interface IRecord extends IUser {
  id: number
}

class LTable extends Table<IRecord> {}

function List ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location }: IProps) {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns: Array<IColumn> = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      render: (text) => <span>{text}岁</span>,
    }, {
      title: '性别',
      dataIndex: 'isMale',
      key: 'isMale',
      render: (text) => <span>{text
            ? '男'
            : '女'}</span>,
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  return (
    <div>
      <LTable
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.id.toString()}
      />
    </div>
  )
}


export { List }
