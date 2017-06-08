import React, { PropTypes } from 'react'
import { Router, browserHistory, RouteConfig } from 'react-router'
import App from './routes/app'
import { RouterStore, SynchronizedHistory } from 'mobx-react-router'
import { Loader } from './loader'

export interface IRouters {
  history: SynchronizedHistory,
  app: Loader
}

const Routers = function ({ history, app }: IRouters): JSX.Element {
  const routes: Array<RouteConfig> = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          app.registerModel(require('./models/dashboard'))
          cb(null, { component: require<any>('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              app.registerModel(require('./models/dashboard'))
              cb(null, require<any>('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              app.registerModel(require('./models/users'))
              cb(null, require<any>('./routes/users/'))
            }, 'users')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              app.registerModel(require('./models/login'))
              cb(null, require<any>('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/request/'))
            }, 'request')
          },
        }, {
          path: 'UIElement/iconfont',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/iconfont/'))
            }, 'UIElement-iconfont')
          },
        }, {
          path: 'UIElement/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/search/'))
            }, 'UIElement-search')
          },
        }, {
          path: 'UIElement/dropOption',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/dropOption/'))
            }, 'UIElement-dropOption')
          },
        }, {
          path: 'UIElement/layer',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/layer/'))
            }, 'UIElement-layer')
          },
        }, {
          path: 'UIElement/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/dataTable/'))
            }, 'UIElement-dataTable')
          },
        }, {
          path: 'UIElement/editor',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/UIElement/editor/'))
            }, 'UIElement-editor')
          },
        }, {
          path: 'chart/lineChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/chart/lineChart/'))
            }, 'chart-lineChart')
          },
        }, {
          path: 'chart/barChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/chart/barChart/'))
            }, 'chart-barChart')
          },
        }, {
          path: 'chart/areaChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/chart/areaChart/'))
            }, 'chart-areaChart')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require<any>('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}


export { Routers }
