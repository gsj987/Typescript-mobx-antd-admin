import { observable, action, runInAction, autorun, computed } from 'mobx';
import { History } from 'history'

const paramsParser = (searchString: string): {[key: string]: string} => {
    if (!searchString) return {}
    let match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = searchString.substring(1)

    let urlParams = {}
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2])
    return urlParams
}

const serializer = (obj: {[key: string]: string|number}): string => {
  let str:Array<string> = [];
  for(let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p].toString()));
    }
  return str.join("&");
}


export class RouterStore {
  history: History
  @observable _path:string
  @observable _search:string

  constructor(history: History) {
    this.history = history
    let location = history.getCurrentLocation()
    this._path = location.pathname
    this._search = location.search
    // callback gets called immediately one time
    this.history.listen(location => {
      runInAction(() => {
        this._path = location.pathname
        this._search = location.search
      })
    })
  }

  @computed get path():string { return this._path }
  @computed get query(): {[key: string]: string} { return paramsParser(this._search) }

  push(path: string, query?: {[key: string]: string|number}) {
    if(query){
      this.history.push(path+'?'+serializer(query))
    }else{
      this.history.push(path)
    }
  }

  replace(path: string, query?: {[key: string]: string|number}) {
    if(query){
      this.history.replace(path+'?'+serializer(query))
    }else{
      this.history.replace(path)
    }
  }

  go(n: number) {
    this.history.go(n)
  }

  goBack() {
    this.history.goBack()
  }
  goForward() {
    this.history.goForward()
  }
}
