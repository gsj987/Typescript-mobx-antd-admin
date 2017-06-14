import React, { PropTypes } from 'react'
import { Icon, Switch } from 'antd'
import styles from './Layout.less'
import { config } from '../../utils'
import { Menus } from './Menu'


interface IProps {
  siderFold: boolean,
  darkTheme: boolean,
  location: string,
  changeTheme: (checked:boolean) => void,
  navOpenKeys: Array<string>,
  changeOpenKeys: (nextOpenKeys: Array<string>) => void
}


function Sider ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys }: IProps) {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        {siderFold ? '' : <span>{config.name}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
      </div> : ''}
    </div>
  )
}


export { Sider }
