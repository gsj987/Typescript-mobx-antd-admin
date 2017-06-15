import React, { PropTypes } from 'react'
import { Layout } from '../components'
import { classnames, config } from '../utils'
import { IAppStore } from '../models/app'
import { Helmet } from 'react-helmet'
import '../themes/index.less'
import { observer } from 'mobx-react'
import { RouterStore } from '../models/router'
import { inject } from '../loader'

const { Header, Bread, Footer, Sider, styles } = Layout


interface IAppProps {
  children: JSX.Element | string,
}

@observer
class App extends React.Component<IAppProps, any> {
  @inject('app')
  private app: IAppStore
  @inject('routing')
  private routing: RouterStore

  render() {
    const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = this.app
    const location = this.routing.path
    const self = this
    const headerProps = {
      user,
      siderFold,
      location,
      isNavbar,
      menuPopoverVisible,
      navOpenKeys,
      switchMenuPopover () {
        self.app.switchMenuPopver()
      },
      logout () {
        self.app.logout({})
      },
      switchSider () {
        self.app.switchSider()
      },
      changeOpenKeys (openKeys: Array<string>) {
        self.app.handleNavOpenKeys(openKeys)
      },
    }

    const siderProps = {
      siderFold,
      darkTheme,
      location,
      navOpenKeys,
      changeTheme () {
        self.app.changeTheme()
      },
      changeOpenKeys (openKeys: Array<string>) {
        localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
        self.app.handleNavOpenKeys(openKeys)
      },
    }

    if (config.openPages && config.openPages.indexOf(location) > -1) {
      return <div>{this.props.children}</div>
    }


    return (
      <div>
        <Helmet>
          <title>ANTD ADMIN</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href={config.logo} type="image/x-icon" />
          {config.iconFontUrl ? <script src={config.iconFontUrl}></script> : ''}
        </Helmet>
        <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
          {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {this.props.children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export { App as default }
