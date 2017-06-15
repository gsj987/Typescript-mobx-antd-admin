import { observable, computed, action, runInAction, autorun } from 'mobx'
import { create, remove, update, query } from '../services/users'
import { PaginationProps } from 'antd/lib/pagination'
import { injectable, inject } from "inversify";

export interface IUser {
  id?: number,
  username?: string,
  password?: string,
  permissions?: Array<string>,
  key?: string,
  name?: string
  nickName?: string,
  age?: number,
  phone?: string,
  isMale?: boolean,
  email?: string,
  address?: string,
  avatar?: string,
  sold?: number,
  sales?: number
}


export interface IUsersStore {
  list:Array<IUser>,
  currentItem: IUser,
  modalVisible: boolean,
  modalType: string,
  isMotion: boolean,
  pagination: PaginationProps,

  query: (payload: any) => void,
  delete: (payload: any) => void,
  create: (payload: any) => void,
  update: (payload: any) => void,
  switchIsMotion: () => void,
  showModal: (type: string, currentItem?: IUser) => void,
  hideModal: () => void
}

@injectable()
class UsersStore implements IUsersStore {
  @observable list:Array<IUser> = []
  @observable currentItem:IUser
  @observable modalVisible:boolean = false
  @observable modalType:string = 'create'
  @observable isMotion:boolean = localStorage.getItem('antdAdminUserIsMotion') === 'true'
  @observable pagination: PaginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    current: 1,
    total: 0
  }

  constructor() {
    this.query({})
  }

  @action.bound
  async query(payload: any) {
    const data = await query(payload)
    runInAction('querySuccess', ()=>{
      if(data) {
        this.list = data.data
        Object.assign(this.pagination, data.page)
      }
    })
  }

  @action.bound
  async delete(payload: any) {
    const data = await remove({id: payload})
    runInAction('deleteSuccess', ()=>{
      if(data && data.success) {
        this.list = data.data
        Object.assign(this.pagination, data.page)
      }
    })
  }

  @action.bound
  async create(payload: any) {
    this.modalVisible = false
    const data = await create(payload)
    runInAction('createSuccess', ()=>{
      if(data && data.success) {
        this.list = data.data
        Object.assign(this.pagination, data.page)
      }
    })
  }

  @action.bound
  async update(payload: any) {
    this.modalVisible = false
    const id = this.currentItem.id
    const newUser = { ...payload, id }
    const data = await update(newUser)
    runInAction('updateSuccess', ()=>{
      this.list = data.data
      Object.assign(this.pagination, data.page)
    })
  }

  @action.bound
  switchIsMotion() {
    this.isMotion = !this.isMotion
    localStorage.setItem('antdAdminUserIsMotion', JSON.stringify(this.isMotion))
  }

  @action.bound
  showModal(type: string, currentItem?: IUser) {
    this.modalType = type
    this.modalVisible = true
    if(currentItem) {
      this.currentItem = currentItem
    }
  }

  @action.bound
  hideModal() { this.modalVisible = false }
}

export { UsersStore as default }
