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

@observer
class Users extends React.Component<void, void> {
  @inject('routing')
  private routing: RouterStore

  @inject('UsersStore')
  private users: IUsersStore

  getUserModalProps = (modalType: string, currentItem: IUser, modalVisible: boolean): IUserModalProps => {
    const self = this
    return {
      item: modalType === 'create' ? {} : currentItem,
      type: modalType,
      visible: modalVisible,
      onOk (data) {
        self.users[modalType](data)
      },
      onCancel () {
        self.users.hideModal()
      }
    }
  }

  getUserListProps = (list: Array<IUser>, pagination: any, isMotion: boolean):IUserListProps => {
    const self = this
    return {
      dataSource: list,
      loading: false,
      pagination,
      isMotion,
      onPageChange (page) {
        self.routing.push(
          self.routing.path,
          {
            ...self.routing.query,
            page: String(page.current),
            pageSize: String(page.pageSize)
          }
        )
        self.users.query(self.routing.query)
      },
      onDeleteItem (id) {
        self.users.delete(id)
      },
      onEditItem (item: IUser) {
        self.users.showModal('update', item)
      }
    }
  }

  getUserFilterProps = (field: string, keyword: string, isMotion: boolean):IUserFilterProps => {
    const self = this
    return {
      field,
      keyword,
      isMotion,
      onSearch (fieldsValue): {} {
        fieldsValue.keyword.length ? self.routing.push(
          '/users',
          {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          }
        ) : self.routing.push('/users')
        self.users.query(self.routing.query)
        return {}
      },
      onAdd () {
        self.users.showModal('create')
      }
    }
  }

  render(){
    const { list, pagination, currentItem, modalVisible, modalType, isMotion } = this.users
    const { field, keyword } = this.routing.query

    const UserModalGen = () =>
      <UserModal {...this.getUserModalProps(modalType, currentItem, modalVisible)} />

    return (
      <div className="content-inner">
        <UserFilter {...this.getUserFilterProps(field, keyword, isMotion)} />
        <UserList {...this.getUserListProps(list, pagination, isMotion)} />
        <UserModalGen />
      </div>
    )
  }
}

export { Users as default }
