import React, { PropTypes } from 'react'
import { Router, browserHistory, RouteConfig } from 'react-router'
import { RouterStore } from './models/router'
import { Loader } from './loader'
import { History } from 'history'

declare var require: Require

export interface IRouters {
  history: History,
  app: Loader
}

const Routers = function ({ history, app }: IRouters): JSX.Element {
  const routes: Array<RouteConfig> = [
    {
      path: '/',
      component: require<any>('./routes/app').default,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          app.registerModel(require<any>('./models/dashboard').default)
          cb(null, { component: require<any>('./routes/dashboard/').default })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              app.registerModel(require<any>('./models/dashboard').default)
              cb(null, require<any>('./routes/dashboard/').default)
            }, 'dashboard')
          },
        }, {
          path: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              app.registerModel(require<any>('./models/users').default)
              cb(null, require<any>('./routes/users/').default)
            }, 'users')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              app.registerModel(require<any>('./models/login').default)
              cb(null, require<any>('./routes/login/').default)
            }, 'login')
          },
        }, {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/request/').default)
            }, 'request')
          },
        }, {
          path: 'UIElement/iconfont',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/iconfont/').default)
            }, 'UIElement-iconfont')
          },
        }, {
          path: 'UIElement/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/search/').default)
            }, 'UIElement-search')
          },
        }, {
          path: 'UIElement/dropOption',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/dropOption/').default)
            }, 'UIElement-dropOption')
          },
        }, {
          path: 'UIElement/layer',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/layer/').default)
            }, 'UIElement-layer')
          },
        }, {
          path: 'UIElement/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/dataTable/').default)
            }, 'UIElement-dataTable')
          },
        }, {
          path: 'UIElement/editor',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/editor/').default)
            }, 'UIElement-editor')
          },
        }, {
          path: 'chart/lineChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/chart/lineChart/').default)
            }, 'chart-lineChart')
          },
        }, {
          path: 'chart/barChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/chart/barChart/').default)
            }, 'chart-barChart')
          },
        }, {
          path: 'chart/areaChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/chart/areaChart/').default)
            }, 'chart-areaChart')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/error/').default)
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}


export { Routers }
