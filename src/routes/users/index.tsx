import React, { PropTypes } from 'react'
import { List as UserList, IProps as IUserListProps } from './UserList'
import { UserFilter, IProps as IUserFilterProps } from './UserFilter'
import { UserModal, IProps as IUserModalProps } from './UserModal'
import { IUsersStore, IUser } from '../../models/users'
import { RouterStore } from '../../models/router'
import { observer } from 'mobx-react'
import { autorun } from 'mobx'
import { inject } from '../../loader'


interface IUserProps {
  routing: RouterStore
  users: IUsersStore,
}

const Users = inject<IUserProps>('users', 'routing')(observer(
  ({ routing, users }: IUserProps) => {
    const { list, pagination, currentItem, modalVisible, modalType, isMotion } = users
    const location = routing.path
    const { field, keyword } = routing.query

    const userModalProps: IUserModalProps = {
      item: modalType === 'create' ? {} : currentItem,
      type: modalType,
      visible: modalVisible,
      onOk (data) {
        users[modalType](data)
      },
      onCancel () {
        users.hideModal()
      },
    }

    const userListProps: IUserListProps = {
      dataSource: list,
      loading: false,
      pagination,
      isMotion,
      onPageChange (page) {
        routing.push(
          location,
          {
            ...routing.query,
            page: String(page.current),
            pageSize: String(page.pageSize)
          }
        )
        users.query(routing.query)
      },
      onDeleteItem (id) {
        users.delete(id)
      },
      onEditItem (item: IUser) {
        users.showModal('update', item)
      },
    }

    const userFilterProps: IUserFilterProps = {
      field,
      keyword,
      isMotion,
      onSearch (fieldsValue): {} {
        fieldsValue.keyword.length ? routing.push(
          '/users',
          {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          }
        ) : routing.push('/users')
        users.query(routing.query)
        return {}
      },
      onAdd () {
        users.showModal('create')
      },
    }

    const UserModalGen = () =>
      <UserModal {...userModalProps} />

    return (
      <div className="content-inner">
        <UserFilter {...userFilterProps} />
        <UserList {...userListProps} />
        <UserModalGen />
      </div>
    )
  }
))

export { Users as default }
