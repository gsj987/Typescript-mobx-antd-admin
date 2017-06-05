import React, { PropTypes } from 'react'
import { List as UserList, IProps as IUserListProps } from './UserList'
import { UserFilter, IProps as IUserFilterProps } from './UserFilter'
import { UserModal, IProps as IUserModalProps } from './UserModal'
import { IUsersStore, IUser } from '../../models/users'
import { RouterStore } from 'mobx-react-router'
import '../../utils/locationExtenions'

interface IUserProps {
  location: Location,
  router: RouterStore
  users: IUsersStore,
  loading: boolean,
}

function Users ({ location, router, users, loading }: IUserProps) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = users
  const field = location.query('field')
  const keyword = location.query('keyword')

  const userModalProps: IUserModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      users.showModal(modalType)
    },
    onCancel () {
      users.hideModal()
    },
  }

  const userListProps: IUserListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    isMotion,
    onPageChange (page) {
      const { query, pathname } = location
      router.push(pathname, {
        ...query,
        page: page.current,
        pageSize: page.pageSize
      })
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
      fieldsValue.keyword.length ? router.push(
        '/users',
        {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        }
      ) : router.push('/users')
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

export { Users }
