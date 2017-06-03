import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { menu } from '../../utils'

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray: typeof menu, siderFold: boolean, parentPath = '/'): Array<JSX.Element> {
  return menuArray.map(item => {
    const linkTo = parentPath + item.key
    if (item.child) {
      return (
        <Menu.SubMenu key={linkTo} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, siderFold, `${linkTo}/`)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={linkTo}>
        <Link to={linkTo}>
          {item.icon ? <Icon type={item.icon} /> : ''}
          {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
        </Link>
      </Menu.Item>
    )
  })
}

interface IProps {
  siderFold: boolean,
  darkTheme: boolean,
  location: Location,
  handleClickNavMenu?: any,
  navOpenKeys: Array<string>,
  changeOpenKeys: (nextOpenKeys: Array<string>) => void
}

function Menus ({ siderFold, darkTheme, location, handleClickNavMenu, navOpenKeys, changeOpenKeys }: IProps) {
  const menuItems = getMenus(menu, siderFold)

  const getAncestorKeys = (key: string): Array<string> => {
    const map = {
      '/navigation/navigation2': ['/navigation'],
    }
    return map[key] || []
  }

  const onOpenChange = (openKeys:Array<string>): void => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys: Array<string> = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }

  let menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys,
  } : {}

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={[location.pathname !== '/' ? location.pathname : '/dashboard']}
    >
      {menuItems}
    </Menu>
  )
}


export { Menus }
