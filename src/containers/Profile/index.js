import React, { useEffect } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col, Avatar, Form, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

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

const mapStateToProps = (state) => {
  return {
    idToken: state.auth.token,
    email: state.auth.email,
    profile: state.profile.profile,
    loading: state.profile.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFullProfile: () => dispatch(actions.getProfile()),
    updateProfile: (payload) => dispatch(actions.updateProfile(payload)),
  };
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name must be required'),
  address: Yup.string().required('Address must be required'),
  dob: Yup.string().required('Day of birth must be required'),
});

const ProfileForm = withFormik({
  displayName: 'formProfile',
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {
      profile: { fullName, address, note, imageUrl, dob, email },
    } = props;
    return {
      fullName: fullName || '',
      email,
      address: address || '',
      note: note || '',
      imageUrl: imageUrl || '',
      dob: (dob && moment(dob)) || '',
    };
  },
  validationSchema: () => validationSchema,
  handleSubmit: async (values, formigBag) => {
    const { props } = formigBag;
    const { dob, ...restparams } = values;
    const { updateProfile } = props;
    await updateProfile({
      dob: moment(dob).toISOString(),
      updatedTime: moment().toISOString(),
      ...restparams,
    });
    props.history.goBack();
  },
})(ProfileUser);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
