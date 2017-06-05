import React, { PropTypes } from 'react'
import { Layout } from '../components'
import { classnames, config } from '../utils'
import { IAppStore } from '../models/app'
import { Helmet } from 'react-helmet'
import '../themes/index.less'

const { Header, Bread, Footer, Sider, styles } = Layout


interface IAppProps {
  children: JSX.Element | string,
  location: Location,
  app: IAppStore
}

const App = ({ children, location, app }: IAppProps) => {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = app

  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      app.switchMenuPopver()
    },
    logout () {
      app.logout({})
    },
    switchSider () {
      app.switchSider()
    },
    changeOpenKeys (openKeys: Array<string>) {
      app.handleNavOpenKeys(openKeys)
    },
  }

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      app.changeTheme()
    },
    changeOpenKeys (openKeys: Array<string>) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      app.handleNavOpenKeys(openKeys)
    },
  }

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
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
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}


export { App }
