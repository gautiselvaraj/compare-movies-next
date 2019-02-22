import { connect } from 'react-redux';
import Search from '../../components/Search';
import { searchMovies } from '../../actions/SearchActions';
import { pushMovieToPath } from '../../utils/UrlUtils';
import Router from 'next/router';

const mapStateToProps = state => {
  const results = state.getIn(['search', 'results']);
  return {
    searchResults: results ? results.toJS() : null,
    fetchingSearchResults: state.getIn(['search', 'fetching'])
  };
};

const mapDispatchToProps = dispatch => ({
  onSearchChange: query => dispatch(searchMovies(query)),
  onSearchSelect: movie => {
    dispatch(searchMovies(null));
    Router.push('/compare', pushMovieToPath(movie));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
