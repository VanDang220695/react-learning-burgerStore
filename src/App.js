import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  state = {
    show: true,
  };

  componentWillUnmount() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Layout>{this.state.show && <BurgerBuilder />}</Layout>
      </div>
    );
  }
}

export default App;
