import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import Loader from '~/components/Loader';
import SearchResults from '~/components/SearchResults';
import SearchHint from '~/components/SearchHint';
import { mdAndUp } from '~/utils/ResponsiveUtils';
import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValuePresent: false,
      highlightedResultIndex: 0,
      inputFocussed: true
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.setHighlightedIndex = this.setHighlightedIndex.bind(this);
    this.onResultMouseEnter = this.onResultMouseEnter.bind(this);
    this.onResultSelect = this.onResultSelect.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchResults !== nextProps.searchResults) {
      this.setState({ highlightedResultIndex: 0 });
    }
  }

  componentWillMount() {
    this.blurTimeout = null;
  }

  componentWillUnmount() {
    window.clearTimeout(this.blurTimeout);
  }

  setHighlightedIndex(key) {
    const highlightedResultIndex = this.state.highlightedResultIndex;
    const searchResults = this.props.searchResults;

    if (searchResults) {
      let newIndex =
        key === 'ArrowDown'
          ? highlightedResultIndex + 1
          : highlightedResultIndex - 1;
      let maxIndex = searchResults.length - 1;
      newIndex = newIndex > maxIndex ? 0 : newIndex;
      newIndex = newIndex < 0 ? maxIndex : newIndex;

      this.setState({
        highlightedResultIndex: newIndex
      });
    }
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        this.setHighlightedIndex(event.key);
        break;
      }
      case 'Enter': {
        this.onResultSelect(this.state.highlightedResultIndex);
        break;
      }
      default:
    }
  }

  onKeyUp(event) {
    this.setState({ inputValuePresent: !!event.target.value });
  }

  onResultMouseEnter(index) {
    this.setState({ highlightedResultIndex: index });
  }

  onResultSelect(index) {
    const searchResults = this.props.searchResults;
    if (searchResults) {
      this.setState({ inputValuePresent: false });
      this.props.onSearchSelect(searchResults[index]);
    }

    // Clear blur timeout
    window.clearTimeout(this.blurTimeout);

    this.searchInput.focus();
    this.setState({ inputFocussed: true });
  }

  onFocus() {
    this.setState({ inputFocussed: true });
  }

  onBlur() {
    // Don't hide search results on blur for mobiles
    if (mdAndUp) {
      // Timeout is set to wait on search result click event
      this.blurTimeout = setTimeout(
        () => this.setState({ inputFocussed: false }),
        150
      );
    }
  }

  render() {
    const {
      highlightedResultIndex,
      inputFocussed,
      inputValuePresent
    } = this.state;
    const { onSearchChange, fetchingSearchResults, searchResults } = this.props;
    const searchResultsId = 'search_results';
    const searchResultsOpened = !!searchResults && inputFocussed;

    return (
      <div className="search" role="search">
        <DebounceInput
          minLength={2}
          value={inputValuePresent ? undefined : ''}
          inputRef={input => {
            this.searchInput = input;
          }}
          debounceTimeout={500}
          onChange={({ target: { value } }) => onSearchChange(value)}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoFocus={true}
          type="search"
          className="search__input"
          autoComplete="off"
          role="combobox"
          aria-owns={searchResultsId}
          aria-controls={searchResultsId}
          aria-autocomplete="list"
          aria-expanded={searchResultsOpened}
          aria-haspopup={searchResultsOpened}
          aria-activedescendant={
            searchResultsOpened
              ? `search_results_result_${highlightedResultIndex}`
              : undefined
          }
        />
        {!inputValuePresent && <SearchHint />}
        {fetchingSearchResults && (
          <div className="search__loader">
            <Loader />
          </div>
        )}
        {inputFocussed &&
          !!searchResults && (
            <SearchResults
              highlightedResultIndex={highlightedResultIndex}
              listId={searchResultsId}
              searchResults={searchResults}
              onMouseEnter={this.onResultMouseEnter}
              onSelect={this.onResultSelect}
              showNoSearchBanner={inputValuePresent && !fetchingSearchResults}
            />
          )}
      </div>
    );
  }
}

Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onSearchSelect: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  fetchingSearchResults: PropTypes.bool.isRequired
};

export default Search;
