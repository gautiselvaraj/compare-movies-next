import React from 'react';
import ReactGA from 'react-ga';
import SocialShares from '../SocialShares';
import './Footer.scss';

export default () => (
  <footer className="footer">
    <SocialShares />
    <p className="footer__created_by">
      <ReactGA.OutboundLink
        eventLabel="Gauti's Website"
        to="https://www.gauti.info"
        className="footer__link"
        target="_blank"
      >
        Created with <span className="footer__heart">&hearts;</span> by Gauti
      </ReactGA.OutboundLink>
    </p>
    <p className="footer__contact">
      If you have any questions,{' '}
      <ReactGA.OutboundLink
        eventLabel="Contact Gauti"
        to="mailto:me@gauti.info"
        className="footer__link"
        target="_blank"
      >
        please contact me.
      </ReactGA.OutboundLink>
    </p>
    <p className="footer__copyright">
      This product uses the TMDb API but is not endorsed or certified by TMDb.
    </p>
    <img src="/static/images/md-logo.png" width="75" alt="TMDb Logo" />
  </footer>
);
