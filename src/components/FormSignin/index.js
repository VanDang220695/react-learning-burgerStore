import React from 'react';
import { Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const FormSigin = () => {
  return (
    <React.Fragment>
      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            type: 'email',
            message: 'Your email is invalid',
          },
        ]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Your email' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 6,
            message: 'Minimum password length six characters',
          },
          {
            max: 10,
            message: 'Maximum password length ten characters',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Your password'
        />
      </Form.Item>
    </React.Fragment>
  );
};
export default FormSigin;
