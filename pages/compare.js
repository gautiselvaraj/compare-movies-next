import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';

class ComparePage extends Component {
  render() {
    return (
      <div>
        <p>Compare World!</p>
      </div>
    );
  }
}

export default withRedux(initStore)(ComparePage);
