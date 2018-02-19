import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResult from '~/components/SearchResult';
import './SearchResults.scss';

class SearchResults extends Component {
  componentDidUpdate() {
    const { searchResults, highlightedItem } = this;
    if (searchResults && highlightedItem) {
      const parentTop = searchResults.scrollTop;
      const parentHeight = searchResults.offsetHeight;
      const parentBottom = parentTop + parentHeight;
      const childTop = highlightedItem.offsetTop;
      const childHeight = highlightedItem.offsetHeight;
      const childBottom = childTop + childHeight;

      if (parentTop > childTop || childBottom > parentBottom) {
        const scrollPosition =
          parentTop > childTop
            ? childTop
            : childTop - parentHeight + childHeight;
        searchResults.scroll({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  render() {
    const {
      listId,
      searchResults,
      onSelect,
      onMouseEnter,
      highlightedResultIndex,
      showNoSearchBanner
    } = this.props;

    return (
      <div className="search-results">
        <ul
          id={listId}
          className="search-results__container"
          role="listbox"
          ref={results => {
            this.searchResults = results;
          }}
        >
          {!!searchResults.length
            ? searchResults.map((movie, i) => (
                <li
                  key={movie.id}
                  ref={item => {
                    if (i === highlightedResultIndex) {
                      this.highlightedItem = item;
                    }
                  }}
                  id={`search_result_${i}`}
                  onClick={() => onSelect(i)}
                  onMouseEnter={() => onMouseEnter(i)}
                >
                  <SearchResult
                    searchResult={movie}
                    highlighted={i === highlightedResultIndex}
                  />
                </li>
              ))
            : showNoSearchBanner && (
                <li className="search-results__no-result">
                  Sorry, we couldn't find any results. Please try again!
                </li>
              )}
        </ul>
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object),
  listId: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  highlightedResultIndex: PropTypes.number.isRequired,
  showNoSearchBanner: PropTypes.bool.isRequired
};

export default SearchResults;
