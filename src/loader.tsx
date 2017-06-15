import { Router } from 'react-router'
import { RouterStore } from './models/router'
import React from 'react'
import { IRouters } from './router'
import { History } from 'history'
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";


export const container = new Container()
export const inject = getDecorators(container).lazyInject

export class Loader {
  private router: (args: IRouters) => JSX.Element
  private cached = {}
  private history: History

  constructor(
    history: History,
    router: (args: IRouters) => JSX.Element ) {
    this.history = history
    this.router = router
  }

  public registerModel = (model) => {
    const namespace = model.name
    if (!this.cached[namespace]) {
      this.cached[namespace] = 1
      container.bind<typeof model>(namespace).to(model)
    }
  }

  public getProvider() {
    return extraProps => (
      this.router({history: this.history, app: this, ...extraProps})
    )
  }
}
