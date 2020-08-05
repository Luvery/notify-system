/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connectHub } from './Message';
import TempName from './EnhancedForm';

// eslint-disable-next-line react/prefer-stateless-function
class SendNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hub: null,
    };
  }

  componentDidMount = async () => {
    await connectHub();
  };

  render() {
    return (
      <>
        <TempName hub={this.state.hub} />
      </>
    );
  }
}

export default SendNotify;
