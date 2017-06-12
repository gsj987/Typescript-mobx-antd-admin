import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import React from 'react'
import { hashHistory } from 'react-router'
import { Loader } from './loader'
import { AppStore } from './models/app'
import { Routers } from './router'

const routingStore = new RouterStore();
const history = syncHistoryWithStore(hashHistory, routingStore);
const appStore = new AppStore(routingStore)

const loader = new Loader(history, routingStore, appStore, Routers)

export class APP extends React.Component<any, void> {
  render(){
    return React.createElement(loader.getProvider())
  }
}
