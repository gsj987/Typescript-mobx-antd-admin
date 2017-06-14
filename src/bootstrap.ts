import { RouterStore } from './models/router'
import React from 'react'
import { hashHistory } from 'react-router'
import { Loader } from './loader'
import { AppStore } from './models/app'
import { Routers } from './router'

const routingStore = new RouterStore(hashHistory);
const appStore = new AppStore(routingStore)

const loader = new Loader(hashHistory, routingStore, appStore, Routers)

export class APP extends React.Component<any, void> {
  render(){
    return React.createElement(loader.getProvider())
  }
}
