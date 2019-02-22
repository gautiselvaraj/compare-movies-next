import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import PageLoader from '../components/PageLoader';
import Suggests from '../components/Suggests';
import { getSuggestedMovies } from '../actions/SuggestsActions';

class IndexPage extends Component {
  static async getInitialProps({ req, store, asPath }) {
    if (req) {
      await store.dispatch(getSuggestedMovies());
    }

    const suggests = store.getState().getIn(['suggests', 'results']);
    return {
      pathName: asPath,
      suggests: suggests ? suggests.toJS() : null
    };
  }

  render() {
    const {
      showPageLoader,
      suggests,
      getSuggestedMovies,
      pathName
    } = this.props;

    return (
      <Layout pathName={pathName}>
        <Suggests
          pathName={pathName}
          suggests={suggests}
          getSuggestedMovies={getSuggestedMovies}
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
  getSuggestedMovies: () => dispatch(getSuggestedMovies())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
