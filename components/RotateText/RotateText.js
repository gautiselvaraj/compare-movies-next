import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import './RotateText.scss';

class RotateText extends Component {
  constructor(props) {
    super(props);
    const { resetTimeOut, delay, backspaceDelay } = props;
    this.state = {
      typing: true,
      resetTimeOutState: resetTimeOut || 10,
      delayState: delay || 1500,
      backspaceDelayState: backspaceDelay || 300
    };
    this.done = this.done.bind(this);
  }

  componentWillMount() {
    this.timeouts = [];
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  done() {
    this.setState({ typing: false }, () => {
      this.timeouts.push(
        setTimeout(
          () => this.setState({ typing: true }),
          this.state.resetTimeOutState
        )
      );
    });
  }

  render() {
    const {
      children,
      resetTimeOut,
      delay,
      backspaceDelay,
      ...restProps
    } = this.props;
    const { typing, delayState, backspaceDelayState } = this.state;

    return typing ? (
      <Typist {...restProps} onTypingDone={this.done}>
        {children.map((child, i) => (
          <span key={i}>
            <span>{child}</span>
            <Typist.Delay ms={delayState} />
            <Typist.Backspace
              count={child.length}
              delay={backspaceDelayState}
            />
            <Typist.Delay ms={delayState} />
          </span>
        ))}
      </Typist>
    ) : (
      <div className="Typist" />
    );
  }
}

RotateText.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  resetTimeOut: PropTypes.number,
  delay: PropTypes.number,
  backspaceDelay: PropTypes.number
};

export default RotateText;
