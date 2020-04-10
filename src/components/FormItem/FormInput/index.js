import React from 'react';
import { Field } from 'formik';
import { Input, Form } from 'antd';

const FormInput = (props) => {
  const { name, required, label, type = 'tex', ...restParams } = props;

  return (
    <Field name={name}>
      {({ meta, field }) => {
        const restProps = { ...field, ...restParams };
        return (
          <Form.Item
            help={(meta.touched && meta.error) || null}
            validateStatus={meta.touched && meta.error ? 'error' : 'validating'}
            label={label}
            required={required}
          >
            {type === 'password' ? <Input.Password {...restProps} /> : <Input {...restProps} />}
          </Form.Item>
        );
      }}
    </Field>
  );
};

export default React.memo(FormInput);
