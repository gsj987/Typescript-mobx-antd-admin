import { observable, computed, action, runInAction } from 'mobx'
import { create, remove, update, query } from '../services/users'

interface IUser {
  id: number,
  username: string,
  password: string,
  permissions: Array<string>
}

interface IPageination {
  showSizeChanger: boolean,
  showQuickJumper: boolean,
  showTotal: (total:number) => string,
  current: number,
  total: number | null
}

interface IUsersState {
  list:Array<IUser>,
  currentItem: IUser,
  modalVisible: boolean,
  modalType: string,
  isMotion: boolean,
  pageination: IPageination,

  query: (payload: any) => void,
  delete: (payload: any) => void,
  create: (payload: any) => void,
  update: (payload: any) => void,
  switchIsMotion: () => void,
  showModal: () => void,
  hideModal: () => void
}

export class UsersState {
  @observable list:Array<IUser> = []
  @observable currentItem:IUser
  @observable modalVisible:boolean = false
  @observable modalType:string = 'create'
  @observable isMotion:boolean = localStorage.getItem('antdAdminUserIsMotion') === 'true'
  @observable pageination:IPageination = {
    showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null
  }

  @action.bound
  async query(payload: any) {
    const data = await query(payload)
    runInAction('querySuccess', ()=>{
      if(data) {
        this.list = data.data
        Object.assign(this.pageination, data.page)
      }
    })
  }

  @action.bound
  async delete(payload: any) {
    const data = await remove({id: payload})
    runInAction('deleteSuccess', ()=>{
      if(data && data.success) {
        this.list = data.data
        Object.assign(this.pageination, data.page)
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
        Object.assign(this.pageination, data.page)
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
      Object.assign(this.pageination, data.page)
    })
  }

  @action.bound
  switchIsMotion() {
    this.isMotion = !this.isMotion
    localStorage.setItem('antdAdminUserIsMotion', JSON.stringify(this.isMotion))
  }

  @action.bound
  showModal() { this.modalVisible = true }

  @action.bound
  hideModal() { this.modalVisible = false }
}
