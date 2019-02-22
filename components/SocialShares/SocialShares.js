import React from 'react';
import PropTypes from 'prop-types';
import './SocialShares.scss';
import ReactGA from 'react-ga';
import { metaTitle, metaUrl } from '../../utils/metas';

const getShareUrl = movies => encodeURIComponent(metaUrl(movies));
const getShareTitle = movies => encodeURIComponent(metaTitle(movies));

const SocialShares = ({ small, movies }) => (
  <ul className={`social-shares ${small ? 'social-shares--small' : ''}`}>
    <li className="social-shares__item">
      <ReactGA.OutboundLink
        eventLabel="Shared on Facebook"
        to={`https://www.facebook.com/sharer/sharer.php?u=${getShareUrl(
          movies
        )}`}
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
        to={`https://twitter.com/share?url=${getShareUrl(
          movies
        )}&text=${getShareTitle(
          movies
        )}&hashtags=comparemovies&via=comparemovies_`}
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
        to={`http://www.reddit.com/submit?url=${getShareUrl(
          movies
        )}&title=${getShareTitle(movies)}`}
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

SocialShares.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
};

export default SocialShares;
