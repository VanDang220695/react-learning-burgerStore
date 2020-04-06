import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Upload, message, Avatar } from 'antd';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';

import * as actions from '../../store/actions';

import classes from './styles.module.css';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const ProfileUser = (props) => {
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { getFullProfile, profile } = props;
  useEffect(() => {
    getFullProfile();
  }, [getFullProfile]);

  useEffect(() => {
    const { email } = profile;
    setEmail(email);
  }, [profile]);

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined style={{ color: 'blue' }} />
      ) : (
        <PlusOutlined style={{ color: 'blue' }} />
      )}
      <div className='ant-upload-text' style={{ color: 'blue' }}>
        Upload
      </div>
    </div>
  );

  const handleChange = (info) => {
    const { file } = info;
    // Get this url from response in real world.
    getBase64(file.originFileObj, (imageUrl) => {
      setLoading(false);
      setImageUrl(imageUrl);
    });
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const customRequest = (params) => {
    setLoading(true);
    const { onSuccess, onProgress } = params;
    return new Promise((resolve) => {
      onProgress(100);
      resolve(onSuccess());
    });
  };

  const changeStatusEdit = (value) => {
    setIsEdit(value);
  };

  const submitForm = (params) => {
    console.log(params);
  };

  const emailShow = email.split('@')[0].toUpperCase() || 'you';

  return (
    <div className={classes.Form__Container}>
      <p className={classes.Title__profile}>
        Welcome <span style={{ fontWeight: '500', color: 'blue' }}>{emailShow}</span> to my Burger
        project.
      </p>
      <Form
        id='formProfile'
        layout='vertical'
        onFinish={submitForm}
        initialValues={{
          email,
        }}
      >
        <Row gutter={64}>
          <Col span={15}>
            <Form.Item
              name='fullName'
              label='Full name'
              rules={[
                {
                  required: true,
                  message: 'Full name is required',
                },
              ]}
            >
              <Input disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='email' label='Email'>
              <Input disabled />
            </Form.Item>
            <Form.Item
              name='dob'
              label='Day of birth'
              rules={[
                {
                  required: true,
                  message: 'Please input your date of birth',
                },
              ]}
            >
              <DatePicker placeholder='' style={{ width: '100%' }} disabled={!isEdit} />
            </Form.Item>
            <Form.Item
              name='address'
              label='Address'
              rules={[
                {
                  required: true,
                  message: 'Please input your address',
                },
              ]}
            >
              <Input disabled={!isEdit} />
            </Form.Item>
            <Form.Item name='note' label='Note'>
              <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} disabled={!isEdit} />
            </Form.Item>
            {isEdit && (
              <React.Fragment>
                <Form.Item
                  label='Photo'
                  name='imageUrl'
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                >
                  <Upload
                    name='avatar'
                    listType='picture-card'
                    className='avatar-uploader'
                    showUploadList={false}
                    customRequest={customRequest}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    form='formProfile'
                    type='primary'
                    htmlType='submit'
                    block
                    style={{ marginBottom: '4px' }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </React.Fragment>
            )}
          </Col>
          <Col span={9}>
            <div className={classes.Avatar__Container}>
              <div>
                <Avatar src='' className={classes.Avatar} size={256} icon={<UserOutlined />} />
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
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
