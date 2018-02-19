import { connect } from 'react-redux';
import Suggests from '~/components/Suggests';
import { getSuggestedMovies } from '~/actions/SuggestsActions';
import { addMovie } from '~/actions/MovieActions';

const mapStateToProps = state => {
  const suggests = state.getIn(['suggests', 'results']);
  return {
    suggests: suggests ? suggests.toJS() : null
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  getSuggestedMovies: query => dispatch(getSuggestedMovies()),
  onMovieSelect: movie => {
    dispatch(addMovie(movie));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Suggests);
