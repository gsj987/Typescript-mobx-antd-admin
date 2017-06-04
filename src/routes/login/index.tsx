import React, { PropTypes } from 'react'
import { Button, Row, Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { config } from '../../utils'
import { ILoginStore } from '../../models/login'
import styles from './index.less'

const FormItem = Form.Item

interface IPros {
  loginStore: ILoginStore,
  form: WrappedFormUtils
}

@Form.create<IPros>()
class Login extends React.Component<IPros, any>{

  handleOk = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      this.props.loginStore.login(values)
    })
  }

  render() {
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
          <span>{config.name}</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {this.props.form.getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名',
                },
              ],
            })(<Input size="large" onPressEnter={this.handleOk} placeholder="用户名" />)}
          </FormItem>
          <FormItem hasFeedback={true}>
            {this.props.form.getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码',
                },
              ],
            })(<Input size="large" type="password" onPressEnter={this.handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={this.handleOk} loading={this.props.loginStore.loginLoading}>
              登录
            </Button>
            <p>
              <span>账号：guest</span>
              <span>密码：guest</span>
            </p>
          </Row>

        </form>
      </div>
    )
  }
}


export { Login }
