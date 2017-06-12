import { Router } from 'react-router'
import { SynchronizedHistory, RouterStore } from 'mobx-react-router'
import { Provider, observer, IWrappedComponent, IReactComponent } from 'mobx-react'
import React from 'react'
import { IRouters } from './router'
import { IStore } from './models/istore'
import { observable, autorun } from 'mobx'

type TStores = {
  [key: string]: any
}


const stores:TStores = {}

const grabStoresByName = (baseStores, storeNames, nextProps) => {
  storeNames.forEach(function (storeName) {
    if (storeName in nextProps) // prefer props over stores
      return;
    if (!(storeName in baseStores))
      throw new Error("Loader injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
    nextProps[storeName] = baseStores[storeName];
  });
  return nextProps;
}


export const inject: (<P>(...storeNames: string[]) => (<TFunction extends IReactComponent<P>>(target: TFunction) => (TFunction & IWrappedComponent<P>)))
  = (...storeNames) => {

    return (Component) => {
      const Wrapper = (props) => {
        let newProps = {};
        for (let key in props) if (props.hasOwnProperty(key)) {
          newProps[key] = props[key];
        }
        var additionalProps = grabStoresByName(stores || {}, storeNames, newProps) || {};
        for (let key in additionalProps) {
          newProps[key] = additionalProps[key];
        }

        return React.createElement(Component, newProps)
      }
      return Wrapper
    }
  }

export class Loader {
  private router: (args: IRouters) => JSX.Element
  private cached = {}
  private history: SynchronizedHistory

  constructor(
    history: SynchronizedHistory,
    routing: RouterStore,
    app: IStore,
    router: (args: IRouters) => JSX.Element ) {
    this.history = history
    stores['routing'] = routing
    stores[app.namespace] = app
    this.cached[app.namespace] = 1
    this.router = router
  }

  public registerModel = (model) => {
    if (!this.cached[model.namespace]) {
      this.cached[model.namespace] = 1
      stores[model.namespace] = model
      console.log(model)
    }
  }

  public getProvider() {
    return extraProps => (
      <Provider {...stores}>
        { this.router({history: this.history, app: this, ...extraProps}) }
      </Provider>
    )
  }
}
