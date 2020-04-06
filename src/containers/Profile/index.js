import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import classes from './styles.module.css';

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 18,
  },
};

const ProfileUser = (props) => {
  const { getFullProfile } = props;
  useEffect(() => {
    getFullProfile();
  }, [getFullProfile]);

  return (
    <div className={classes.Form__Container}>
      <p className={classes.Title__profile}>Your Profile</p>
      <Form id='formProfile' layout='vertical'>
        <Row>
          <Col />
        </Row>
        <Form.Item
          name={['user', 'name']}
          label='Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label='Email'
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label='Age'
          rules={[
            {
              type: 'number',
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label='Website'>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label='Introduction'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    idToken: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFullProfile: () => dispatch(actions.getProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
