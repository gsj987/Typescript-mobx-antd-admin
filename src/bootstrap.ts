import { RouterStore } from './models/router'
import React from 'react'
import { hashHistory } from 'react-router'
import { Loader, container } from './loader'
import { Container } from "inversify";
import { AppStore, IAppStore } from './models/app'


const routingStore = new RouterStore(hashHistory)
container.bind<RouterStore>('routing').toConstantValue(routingStore)
container.bind<IAppStore>('app').to(AppStore)

import { Routers } from './router'
const loader = new Loader(hashHistory, Routers)

export class APP extends React.Component<any, void> {
  render(){
    return React.createElement(loader.getProvider())
  }
}
