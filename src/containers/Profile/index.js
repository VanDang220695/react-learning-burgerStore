import React, { useEffect } from 'react';
import { Button, Row, Col, Avatar, Form, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {
  FormInput,
  FormDatePicker,
  FormTextArea,
  FormUploadImage,
} from '../../components/FormItem';

import classes from './styles.module.css';

import enhanceProfile from './enhanceProfile';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 5,
    },
  },
};

const ProfileUser = (props) => {
  const {
    getFullProfile,
    values,
    profile: { fullName },
  } = props;

  useEffect(() => {
    getFullProfile();
  }, [getFullProfile]);

  const { dob, imageUrl } = values;

  return (
    <div className={classes.Form__Container}>
      <p className={classes.Title__profile}>
        Welcome <span style={{ fontWeight: '500', color: 'blue' }}>{fullName || 'you'}</span> to my
        Burger project.
      </p>
      <Skeleton loading={props.loading}>
        <Row gutter={32} style={{ marginTop: '20px' }}>
          <Col span={16}>
            <Form
              id='formProfile'
              onFinish={props.handleSubmit}
              layout='horizontal'
              {...formItemLayout}
            >
              <FormInput name='fullName' required label='Full name' />
              <FormInput name='email' label='Email' disabled={true} />
              <FormInput name='address' required label='Address' />
              <FormDatePicker
                name='dob'
                required
                label='Day of birth'
                value={dob}
                onChange={props.setFieldValue}
              />
              <FormTextArea name='note' label='Note' />
              <FormUploadImage
                value={imageUrl}
                name='imageUrl'
                label='Photo'
                setFieldValue={props.setFieldValue}
              />
              <Form.Item {...tailFormItemLayout}>
                <Row justify='space-between' gutter={64}>
                  <Col span={12}>
                    <Button block onClick={() => props.resetForm()}>
                      Reset
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button form='formProfile' type='primary' block htmlType='submit'>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}>
            <div className={classes.Avatar__Container}>
              <div>
                <Avatar
                  src={imageUrl}
                  className={classes.Avatar}
                  size={128}
                  shape='square'
                  icon={<UserOutlined />}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Skeleton>
    </div>
  );
};

export default enhanceProfile(ProfileUser);
