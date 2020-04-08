import React from 'react';
import { Field } from 'formik';
import { DatePicker, Form } from 'antd';

const FormDatePicker = (props) => {
  const { value, disabled = false, name, required, label, placeholder = '', onChange } = props;

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
            <DatePicker
              style={{ width: '100%' }}
              format='DD-MM-YYYY'
              placeholder={placeholder}
              name={name}
              value={value}
              disabled={disabled}
              onChange={(value) => onChange(name, value)}
            />
          </Form.Item>
        );
      }}
    </Field>
  );
};

export default React.memo(FormDatePicker);
