import { login } from '../services/login'
import { observable, computed, action, runInAction } from 'mobx'
import { queryURL } from '../utils'
import { IStore } from './istore'

export interface ILoginStore extends IStore {
  loginLoading: boolean,
  login: (payload: any) => void
}

export class LoginState implements ILoginStore {
  namespace = 'login'

  @observable loginLoading: boolean = false;

  @action.bound
  async login(payload) {
    this.loginLoading = true
    const data = await login(payload);
    runInAction('loginCallback', ()=>{
      this.loginLoading = false
      if (data.success) {
        const from = queryURL('from')
        if (from) {
          window.location.href = from
        }else{
          window.location.href = '/dashboard'
        }
      }else{
        throw data
      }
    })
  }
}


const loginStore = new LoginState()
export { loginStore as default }
