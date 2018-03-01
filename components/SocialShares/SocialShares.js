import React, { Component } from 'react';
import { logSocialShared } from '~/utils/GAUtils';
import './SocialShares.scss';

const getShareUrl = () => encodeURIComponent(location.href);
const getShareTitle = () => encodeURIComponent(document.title);
const openLinkInNewTab = link => window.open(link, '_blank');

export default class SocialShares extends Component {
  facebookShare() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${getShareUrl()}`;
    logSocialShared(url, 'Facebook');
    openLinkInNewTab(url);
  }

  twitterShare() {
    const url = `https://twitter.com/share?url=${getShareUrl()}&text=${getShareTitle()}&hashtags=comparemovies&via=comparemovies_`;
    logSocialShared(url, 'Twitter');
    openLinkInNewTab(url);
  }

  redditShare() {
    const url = `http://www.reddit.com/submit?url=${getShareUrl()}&title=${getShareTitle()}`;
    logSocialShared(url, 'FacebRedditook');
    openLinkInNewTab(url);
  }

  render() {
    const small = this.props.small;

    return (
      <ul className={`social-shares ${small ? 'social-shares--small' : ''}`}>
        <li className="social-shares__item">
          <button
            type="button"
            onClick={this.facebookShare}
            className={`social-shares__link ${
              small ? '' : 'social-shares__link--invert'
            }`}
          >
            <i className="fa fa-facebook-official" />
          </button>
        </li>
        <li className="social-shares__item">
          <button
            type="button"
            onClick={this.twitterShare}
            className={`social-shares__link ${
              small ? '' : 'social-shares__link--invert'
            }`}
          >
            <i className="fa fa-twitter" />
          </button>
        </li>
        <li className="social-shares__item">
          <button
            type="button"
            onClick={this.redditShare}
            className={`social-shares__link ${
              small ? '' : 'social-shares__link--invert'
            }`}
          >
            <i className="fa fa-reddit" />
          </button>
        </li>
      </ul>
    );
  }
}
