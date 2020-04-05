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
        hasFeedback
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
          () => {
            return {
              validator(_, value) {
                if (
                  !value ||
                  value.length < 6 ||
                  value.length > 10 ||
                  /(?=.*[0-9])+(?=.*[A-Z])/g.test(value)
                ) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    'The password must contain at least one uppercase character and numeric character',
                  );
                }
              },
            };
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Your password'
        />
      </Form.Item>
      <Form.Item
        name='confirmPassword'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input your confirm password!',
          },
          ({ getFieldValue }) => {
            return {
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject('The confirm password does not match');
                }
              },
            };
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Confirm password'
        />
      </Form.Item>
    </React.Fragment>
  );
};
export default FormSigin;
