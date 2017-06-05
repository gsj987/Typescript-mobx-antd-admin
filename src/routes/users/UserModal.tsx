import React, { PropTypes } from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { ModalProps } from 'antd/lib/modal/modal'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

interface IUser {
  key?: string,
  name?: string
  nickName?: string,
  age?: number,
  phone?: string,
  isMale?: boolean,
  email?: string,
  address?: string,
}

export interface IProps {
  visible: boolean,
  type: string,
  item: IUser,
  onOk: Function,
  onCancel:((e: React.MouseEvent<any>) => void) | undefined
}

interface IFormWrapper {
  form: WrappedFormUtils,
}

class MModal extends React.Component<IProps & IFormWrapper, any>{

  modalOpts: ModalProps

  constructor(props: IProps & IFormWrapper) {
    super(props)
    this.modalOpts = {
      title: `${props.type === 'create' ? '新建用户' : '修改用户'}`,
      visible: props.visible,
      onOk: this.handleOk,
      onCancel: props.onCancel,
      wrapClassName: 'vertical-center-modal',
    }
  }

  handleOk = () => {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ... this.props.form.getFieldsValue(),
        key: this.props.item.key,
      }
      this.props.onOk(data)
    })
  }

  render() {
    return (
      <Modal {...this.modalOpts}>
        <Form layout="horizontal">
          <FormItem label="姓名：" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('name', {
              initialValue: this.props.item.name,
              rules: [
                {
                  required: true,
                  message: '姓名未填写',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="昵称：" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('nickName', {
              initialValue: this.props.item.nickName,
              rules: [
                {
                  required: true,
                  message: '昵称未填写',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="性别" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('isMale', {
              initialValue: this.props.item.isMale,
              rules: [
                {
                  required: true,
                  type: 'boolean',
                  message: '请选择性别',
                },
              ],
            })(
              <Radio.Group>
                <Radio value>男</Radio>
                <Radio value={false}>女</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="年龄：" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('age', {
              initialValue: this.props.item.age,
              rules: [
                {
                  required: true,
                  type: 'number',
                  message: '年龄未填写',
                },
              ],
            })(<InputNumber min={18} max={100} />)}
          </FormItem>
          <FormItem label="电话：" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('phone', {
              initialValue: this.props.item.phone,
              rules: [
                {

                  required: true,

                  message: '不能为空',

                },

              ],

            })(<Input />)}

          </FormItem>
          <FormItem label="邮箱：" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('email', {
              initialValue: this.props.item.email,
              rules: [

                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label="住址：" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('address', {
              initialValue: this.props.item.address,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>

    )

  }

}

const UserModal: React.StatelessComponent<IProps> =  Form.create<IProps>()(MModal)

export { UserModal }
