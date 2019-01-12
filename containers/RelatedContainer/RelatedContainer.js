import { connect } from 'react-redux';
import Related from '../../components/Related';
import { addMovie } from '../../actions/MovieActions';

const mapDispatchToProps = (dispatch, props) => ({
  onRelatedSelect: movie => {
    dispatch(addMovie(movie));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Related);
