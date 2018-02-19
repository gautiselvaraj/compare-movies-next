import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';

class IndexPage extends Component {
  render() {
    return (
      <div>
        <p>Hello World!</p>
      </div>
    );
  }
}

export default withRedux(initStore)(IndexPage);
