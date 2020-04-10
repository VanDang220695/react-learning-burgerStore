import React from 'react';

import { Modal } from 'antd';
import AuxContainer from '../AuxContainer';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <AuxContainer>
        <Modal visible={error} onCancel={clearError}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </AuxContainer>
    );
  };
};

export default withErrorHandler;
