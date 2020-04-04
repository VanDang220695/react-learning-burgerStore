import React from 'react';

import Modal from '../../components/UI/Modal';
import AuxContainer from '../AuxContainer';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <AuxContainer>
        <Modal show={error} modalClosed={clearError}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </AuxContainer>
    );
  };
};

export default withErrorHandler;
