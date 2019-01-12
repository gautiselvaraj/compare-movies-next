import '../styles/browser_unsupported.scss';

import Helmet from 'react-helmet';
import Metas from '../components/Metas';

export default () => (
  <div className="not-supported">
    <Metas />
    <div className="not-supported__header">
      <img src="/static/android-chrome-512x512.png" width="100" height="100" />
      <h1 className="not-supported__logo__text">Compare Movies</h1>
    </div>
    <h3>Browser Not Supported</h3>
    <p className="not-supported__paragraph">
      Please update your browser to run this app
    </p>
    <a
      href="https://updatemybrowser.org/"
      className="not-supported__button"
      target="_blank"
    >
      Update Browser
    </a>
  </div>
);
