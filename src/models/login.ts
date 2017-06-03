import { login } from '../services/login'
import { observable, computed, action, runInAction } from 'mobx'
import { queryURL } from '../utils'

interface ILoginState {
  loginLoading: boolean,
  login: (payload: any) => void
}

export class LoginState implements ILoginState{
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
