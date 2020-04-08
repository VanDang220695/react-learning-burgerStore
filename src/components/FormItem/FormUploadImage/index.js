import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
import { Upload, Form, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { getBase64 } from '../../../utils/utils';

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

const FormUploadImage = (props) => {
  const { disabled = false, name, required, label, setFieldValue, value } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (value) {
      setImageUrl(value);
    }
  }, [value]);

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
      setFieldValue(name, imageUrl);
      setImageUrl(imageUrl);
    });
  };
  const customRequest = (params) => {
    setLoading(true);
    const { onSuccess, onProgress } = params;
    return new Promise((resolve) => {
      onProgress(100);
      resolve(onSuccess());
    });
  };
  return (
    <Field name={name}>
      {({ meta }) => {
        return (
          <Form.Item
            colon={false}
            help={(meta.touched && meta.error) || null}
            validateStatus={meta.touched && meta.error ? 'error' : 'validating'}
            label={label}
            required={required}
          >
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              disabled={disabled}
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
        );
      }}
    </Field>
  );
};

export default React.memo(FormUploadImage);
