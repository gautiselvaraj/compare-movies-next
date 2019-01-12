import { connect } from 'react-redux';
import Search from '../../components/Search';
import { searchMovies } from '../../actions/SearchActions';
import { addMovie } from '../../actions/MovieActions';

const mapStateToProps = state => {
  const results = state.getIn(['search', 'results']);
  return {
    searchResults: results ? results.toJS() : null,
    fetchingSearchResults: state.getIn(['search', 'fetching'])
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onSearchChange: query => dispatch(searchMovies(query)),
  onSearchSelect: movie => {
    dispatch(searchMovies(null));
    dispatch(addMovie(movie));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
