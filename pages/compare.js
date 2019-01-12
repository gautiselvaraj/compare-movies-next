import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import PageLoader from '../components/PageLoader';
import Movies from '../components/Movies';
import Metas from '../components/Metas';
import { fetchMoviesFromUrl, removeMovie } from '../actions/MovieActions';

class ComparePage extends Component {
  static async getInitialProps({ req, store, asPath }) {
    if (req) {
      await store.dispatch(fetchMoviesFromUrl(asPath));
    }
    const url = asPath;

    const movies = store
      .getState()
      .getIn(['movies', 'list'])
      .toJS();
    return {
      movies,
      url
    };
  }

  render() {
    const { movies, showPageLoader, url, removeMovie } = this.props;
    return (
      <Layout noFooter>
        {!!movies && <Movies movies={movies} removeMovie={removeMovie} />}
        <Metas movies={movies} url={url} />
        {showPageLoader && <PageLoader />}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.getIn(['movies', 'list']).toJS(),
  showPageLoader: state.getIn(['movies', 'fetching'])
});

const mapDispatchToProps = (dispatch, props) => ({
  removeMovie: movie => dispatch(removeMovie(movie))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparePage);
