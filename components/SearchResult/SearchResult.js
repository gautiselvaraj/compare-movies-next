import React from 'react';
import PropTypes from 'prop-types';
import { formatedDate } from '~/utils/CMUtils';
import Poster from '~/components/Poster';
import Vote from '~/components/Vote';
import './SearchResult.scss';

const SearchResult = ({ searchResult, highlighted }) => (
  <div
    className={`search-result ${
      highlighted ? 'search-result--highlighted' : ''
    }`}
  >
    <div className="search-result__media">
      <Poster
        size={92}
        path={searchResult.poster_path}
        alt={searchResult.title || searchResult.name}
        className="search-result__image"
      />
    </div>
    <div className="search-result__details">
      <div className="search-result__title">
        {searchResult.title || searchResult.name}
      </div>
      <div>
        <div className="search-result__date">
          {formatedDate(
            searchResult.release_date || searchResult.first_air_date
          )}
        </div>
        <div className="search-result__vote">
          <Vote vote={searchResult.vote_average} />
        </div>
      </div>
    </div>
  </div>
);

SearchResult.propTypes = {
  searchResult: PropTypes.object.isRequired,
  highlighted: PropTypes.bool.isRequired
};

export default SearchResult;
