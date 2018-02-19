import { connect } from 'react-redux';
import Body from '~/components/Body';
import { removeMovie, fetchMoviesFromUrl } from '~/actions/MovieActions';
import { moviesAvailable } from '~/utils/CMUtils';

const mapStateToProps = state => ({
  movies: state.getIn(['movies', 'list']).toJS(),
  moviesAvailable: moviesAvailable(state),
  showPageLoader:
    state.getIn(['movies', 'fetching']) || state.getIn(['suggests', 'fetching'])
});

const mapDispatchToProps = (dispatch, props) => ({
  removeMovie: movie => dispatch(removeMovie(movie)),
  fetchMoviesFromUrl: () => {
    dispatch(fetchMoviesFromUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
