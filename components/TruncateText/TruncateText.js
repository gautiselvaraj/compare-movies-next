import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TruncateText.scss';

class TruncateText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: props.words || 25,
      truncated: false,
      truncatedChildren: props.children
    };
    this.expandText = this.expandText.bind(this);
  }

  componentDidMount() {
    const words = this.state.words;
    const originalChildren = this.props.children;
    let childrenSplit = originalChildren.split(' ');
    if (childrenSplit.length > words) {
      this.setState({
        truncated: true,
        truncatedChildren: childrenSplit.splice(0, words).join(' ')
      });
    }
  }

  expandText() {
    this.props.onOpen();
    this.setState({
      truncated: false,
      truncatedChildren: this.props.children
    });
  }

  render() {
    const { truncatedChildren, truncated } = this.state;
    return (
      <div>
        {truncatedChildren}
        {truncated && (
          <button
            onClick={this.expandText}
            className="text-truncate__more-link"
          >
            more
          </button>
        )}
      </div>
    );
  }
}

TruncateText.propTypes = {
  children: PropTypes.string.isRequired,
  words: PropTypes.number,
  onOpen: PropTypes.func.isRequired
};

export default TruncateText;
