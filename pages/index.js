import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import PageLoader from '../components/PageLoader';
import Suggests from '../components/Suggests';
import { getSuggestedMovies } from '../actions/SuggestsActions';
import { addMovie, removeAllMovies } from '../actions/MovieActions';

class IndexPage extends Component {
  static async getInitialProps({ req, store }) {
    if (req) {
      await store.dispatch(getSuggestedMovies());
    } else {
      store.dispatch(removeAllMovies());
    }

    const suggests = store.getState().getIn(['suggests', 'results']);
    return {
      suggests: suggests ? suggests.toJS() : null
    };
  }

  render() {
    const {
      showPageLoader,
      suggests,
      getSuggestedMovies,
      onMovieSelect
    } = this.props;

    return (
      <Layout>
        <Suggests
          suggests={suggests}
          getSuggestedMovies={getSuggestedMovies}
          onMovieSelect={onMovieSelect}
        />
        {showPageLoader && <PageLoader />}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const suggests = state.getIn(['suggests', 'results']);
  return {
    showPageLoader:
      state.getIn(['suggests', 'fetching']) ||
      state.getIn(['movies', 'fetching']),
    suggests: suggests ? suggests.toJS() : null
  };
};

const mapDispatchToProps = dispatch => ({
  getSuggestedMovies: () => dispatch(getSuggestedMovies()),
  onMovieSelect: movie => dispatch(addMovie(movie))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
