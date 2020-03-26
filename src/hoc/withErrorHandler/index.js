import React, { Component } from "react";

import Modal from "../../components/UI/Modal";
import AuxContainer from "../AuxContainer";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    // componentWillUnmount() {
    //   axios.interceptors.request.reject(this.reqInterceptor);
    //   axios.interceptors.response.reject(this.resInterceptor);
    // }

    errorConfirmedHanlder = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <AuxContainer>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHanlder}
          >
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </AuxContainer>
      );
    }
  };
};

export default withErrorHandler;
