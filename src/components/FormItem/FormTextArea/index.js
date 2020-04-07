import React from 'react';
import { Field } from 'formik';
import { Input, Form } from 'antd';

const FormInput = (props) => {
  const { disabled = false, name, required, label, placeholder = '' } = props;

  return (
    <Field name={name}>
      {({ meta, field }) => {
        return (
          <Form.Item
            colon={false}
            help={(meta.touched && meta.error) || null}
            validateStatus={meta.touched && meta.error ? 'error' : 'validating'}
            label={label}
            placeholder={placeholder}
            required={required}
          >
            <Input.TextArea
              name={name}
              disabled={disabled}
              autoSize={{ minRows: 4, maxRows: 4 }}
              {...field}
            />
          </Form.Item>
        );
      }}
    </Field>
  );
};

export default React.memo(FormInput);
