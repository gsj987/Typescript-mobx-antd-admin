import React, { PropTypes } from 'react'
import { Form, Button, Row, Col, Switch } from 'antd'
import { Search } from '../../components'


export interface IProps {
  field: any,
  keyword: string,
  onSearch: (value: {keyword: string, field: string}) => {},
  onAdd: any,
  isMotion: boolean,
}

const UserFilter = ({
  field,
  keyword,
  onSearch,
  onAdd,
  isMotion,
}: IProps) => {
  const searchGroupProps = {
    keyword,
    size: 'large',
    select: true,
    selectOptions: [{ value: 'name', name: '姓名' }, { value: 'address', name: '地址' }],
    selectProps: {
      defaultValue: field || 'name',
    },
    onSearch: (value) => {
      onSearch(value)
    },
  }
  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
        <Search {...searchGroupProps} />
      </Col>
      <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        {/* <Switch style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren={'动画开'} unCheckedChildren={'动画关'} /> */}
        <Button size="large" type="ghost" onClick={onAdd}>添加</Button>
      </Col>
    </Row>
  )
}


export { UserFilter }
