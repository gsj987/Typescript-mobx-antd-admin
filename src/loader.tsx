import { Router } from 'react-router'
import { SynchronizedHistory, RouterStore } from 'mobx-react-router'
import { Provider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import { IRouters } from './router'
import { IStore } from './models/istore'


type TStores = {
  [key: string]: any
}


export class Loader {
  private stores: TStores = {}
  private router: (args: IRouters) => JSX.Element
  private cached = {}
  private history: SynchronizedHistory

  constructor(
    history: SynchronizedHistory,
    routing: RouterStore,
    app: IStore,
    router: (args: IRouters) => JSX.Element ) {
    this.history = history
    this.stores['routing'] = routing
    this.stores[app.namespace] = app
    this.cached[app.namespace] = 1
    this.router = router
  }

  public registerModel = (model) => {
    if (!this.cached[model.namespace]) {
      this.cached[model.namespace] = 1
      this.stores[model.namespace] = model
    }
  }

  public start = (node:string) => {
    let container = document.querySelector(node);
    ReactDOM.render(React.createElement(this.getProvider(this.stores)), container);
  }

  private getProvider(stores: TStores) {
    return extraProps => (
      <Provider {...stores} >
        { this.router({history: this.history, app: this, ...extraProps}) }
      </Provider>
    )
  }
}
