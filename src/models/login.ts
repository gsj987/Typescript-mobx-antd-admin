import { login } from '../services/login'
import { observable, computed, action, runInAction } from 'mobx'
import { RouterStore } from './router'
import { injectable, inject } from "inversify";

export interface ILoginStore {
  loginLoading: boolean,
  login: (payload: any) => void
}

@injectable()
class LoginStore implements ILoginStore {
  @observable loginLoading: boolean = false

  private router: RouterStore

  constructor(@inject('routing') router: RouterStore) {
    this.router = router
  }

  @action.bound
  async login(payload) {
    this.loginLoading = true
    const data = await login(payload);
    runInAction('loginCallback', ()=>{
      this.loginLoading = false
      if (data.success) {
        const from = this.router.query.from
        if (from) {
          this.router.push(from)
        }else{
          this.router.push('/dashboard')
        }
      }else{
        throw data
      }
    })
  }
}


export { LoginStore as default }
