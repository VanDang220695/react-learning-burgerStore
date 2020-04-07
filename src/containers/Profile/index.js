import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col, Avatar, Form } from 'antd';
import { connect } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

import {
  FormInput,
  FormDatePicker,
  FormTextArea,
  FormUploadImage,
} from '../../components/FormItem';

import * as actions from '../../store/actions';

import classes from './styles.module.css';

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

const ProfileUser = (props) => {
  const { getFullProfile, profile } = props;
  const [email, setEmail] = useState('');
  const [isEdit, setIsEdit] = useState(true);

  console.log(props);

  useEffect(() => {
    getFullProfile();
  }, [getFullProfile]);

  useEffect(() => {
    const { email } = profile;
    setEmail(email);
  }, [profile]);

  const changeStatusEdit = (value) => {
    setIsEdit(value);
  };

  const emailShow = email.split('@')[0].toUpperCase() || 'you';

  return (
    <div className={classes.Form__Container}>
      <p className={classes.Title__profile}>
        Welcome <span style={{ fontWeight: '500', color: 'blue' }}>{emailShow}</span> to my Burger
        project.
      </p>
      <Row gutter={32} style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Form
            id='formProfile'
            onFinish={props.handleSubmit}
            layout='horizontal'
            {...formItemLayout}
          >
            <FormInput name='fullName' required label='Full name' />
            <FormInput name='email' label='Email' />
            <FormInput name='address' required label='Address' />
            <FormDatePicker
              name='dob'
              required
              label='Day of birth'
              onChange={props.setFieldValue}
            />
            <FormTextArea name='note' label='Note' />
            <FormUploadImage name='imageUrl' label='Photo' setFieldValue={props.setFieldValue} />
            <Button
              form='formProfile'
              type='primary'
              htmlType='submit'
              block
              style={{ marginTop: '20px' }}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col span={8}>
          <div className={classes.Avatar__Container}>
            <div>
              <Avatar
                src={props.values.imageUrl}
                className={classes.Avatar}
                size={128}
                shape='circle'
                icon={<UserOutlined />}
              />
            </div>
            <div className={classes.Group__Button__Container}>
              <div className={classes.Group__Button}>
                <Button className={classes.Button} onClick={() => changeStatusEdit(false)}>
                  Cancel
                </Button>
                <Button
                  type='primary'
                  className={classes.Button}
                  style={{ marginLeft: '16px' }}
                  onClick={() => changeStatusEdit(true)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    idToken: state.auth.token,
    profile: state.profile.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFullProfile: () => dispatch(actions.getProfile()),
  };
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name must be required'),
  address: Yup.string().required('Address must be required'),
});

const ProfileForm = withFormik({
  displayName: 'formProfile',
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {
      profile: { fullName, email, address, note, imageUrl, dob },
    } = props;
    return {
      fullName: fullName || '',
      email: email || '',
      address: address || '',
      note: note || '',
      imageUrl: imageUrl || '',
      dob: dob || '',
    };
  },
  validationSchema: () => validationSchema,
  handleSubmit: (props) => {
    console.log('props', props);
  },
})(ProfileUser);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
