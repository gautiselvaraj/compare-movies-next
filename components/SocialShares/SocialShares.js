import React from 'react';
import './SocialShares.scss';
const isClient = typeof window !== 'undefined';
import ReactGA from 'react-ga';

const getShareUrl = () =>
  encodeURIComponent(
    isClient ? location.href : 'https://www.comparemovies.info/'
  );

const getShareTitle = () =>
  encodeURIComponent(
    isClient && location.pathname !== '/'
      ? document.title
      : 'Confused about what to watch? Compare movies and TV shows and make informed decisions.'
  );

export default ({ small }) => (
  <ul className={`social-shares ${small ? 'social-shares--small' : ''}`}>
    <li className="social-shares__item">
      <ReactGA.OutboundLink
        eventLabel="Shared on Facebook"
        to={`https://www.facebook.com/sharer/sharer.php?u=${getShareUrl()}`}
        className={`social-shares__link ${
          small ? '' : 'social-shares__link--invert'
        }`}
        aria-label="Share on Facebook"
        target="_blank"
      >
        <i className="fa fa-facebook-official" />
      </ReactGA.OutboundLink>
    </li>
    <li className="social-shares__item">
      <ReactGA.OutboundLink
        eventLabel="Shared on Twitter"
        to={`https://twitter.com/share?url=${getShareUrl()}&text=${getShareTitle()}&hashtags=comparemovies&via=comparemovies_`}
        target="_blank"
        className={`social-shares__link ${
          small ? '' : 'social-shares__link--invert'
        }`}
        aria-label="Share on Twitter"
      >
        <i className="fa fa-twitter" />
      </ReactGA.OutboundLink>
    </li>
    <li className="social-shares__item">
      <ReactGA.OutboundLink
        eventLabel="Shared on Reddit"
        to={`http://www.reddit.com/submit?url=${getShareUrl()}&title=${getShareTitle()}`}
        target="_blank"
        className={`social-shares__link ${
          small ? '' : 'social-shares__link--invert'
        }`}
        aria-label="Share on Reddit"
      >
        <i className="fa fa-reddit" />
      </ReactGA.OutboundLink>
    </li>
  </ul>
);
