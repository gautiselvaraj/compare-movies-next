import { connect } from 'react-redux';
import Header from '~/components/Header';
import { moviesAvailable } from '~/utils/CMUtils';

const mapStateToProps = state => ({
  shrinkHeader: moviesAvailable(state)
});

export default connect(mapStateToProps)(Header);
