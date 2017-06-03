import React, { PropTypes } from 'react'
import { Dropdown, Button, Icon, Menu } from 'antd'

interface IMenuItem {
  key: string,
  name: string
}

interface IProps {
  onMenuClick: any,
  menuOptions: Array<IMenuItem>,
  buttonStyle: object | null,
  dropdownProps: any
}

const DropOption = ({ onMenuClick, menuOptions = [], buttonStyle, dropdownProps }: IProps) => {
  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)
  return (<Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <Button style={{ border: 'none', ...buttonStyle }}>
      <Icon style={{ marginRight: 2 }} type="bars" />
      <Icon type="down" />
    </Button>
  </Dropdown>)
}


export { DropOption }
