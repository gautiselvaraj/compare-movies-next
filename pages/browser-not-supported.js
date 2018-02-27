import '~/styles/index.scss';

import Helmet from 'react-helmet';
import Metas from '~/components/Metas';

export default () => (
  <div className="not-supported">
    <Metas />
    <h2>Browser Unsupported</h2>
    <p className="not-supported__paragraph">
      Please update your browser to run this app.
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
