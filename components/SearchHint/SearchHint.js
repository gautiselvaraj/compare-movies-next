import React from 'react';
import RotateText from '../RotateText';
import './SearchHint.scss';

export default () => (
  <div className="search-hint">
    <div className="search-hint__text">
      Type any
      <RotateText children={['Movie', 'TV Show']} avgTypingDelay={100} />
      title...
    </div>
  </div>
);
