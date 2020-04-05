import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'blue' }} spin />;

const Spinner = ({ spinning, children, className = '' }) => (
  <Spin tip='Loading...' className={className} spinning={spinning} indicator={antIcon}>
    {children}
  </Spin>
);

export default Spinner;
