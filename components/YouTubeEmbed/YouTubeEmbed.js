import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '~/components/Loader';
import './YouTubeEmbed.scss';

class YouTubeEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = { playerReady: false, playerError: false };
  }

  componentDidMount() {
    if (window.YT) {
      this.player = new window.YT.Player(this.iframePlayer, {
        width: 800,
        height: 'auto',
        events: {
          onReady: () => {
            this.player.loadPlaylist(this.props.youTubekeys);
            this.player.playVideo();
            this.setState({ playerReady: true });
          }
        },
        playerVars: {
          fs: 0,
          rel: 0
        }
      });
    } else {
      this.setState({ playerReady: true, playerError: true });
    }
  }

  componentWillUnmount() {
    this.player && this.player.destroy();
  }

  render() {
    const { playerReady, playerError } = this.state;

    return (
      <div className="youtube-embed">
        {playerError ? (
          <div className="youtube-embed__error">
            Error loading video player. Please try again.
          </div>
        ) : (
          <div>
            {!playerReady && (
              <div className="youtube-embed__loader">
                <Loader shortLoader={false} />
              </div>
            )}
            <div
              className="youtube-embed__container"
              style={{ opacity: playerReady ? 1 : 0 }}
            >
              <div ref={p => (this.iframePlayer = p)} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

YouTubeEmbed.propTypes = {
  youTubekeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default YouTubeEmbed;
