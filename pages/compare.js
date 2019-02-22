import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import PageLoader from '../components/PageLoader';
import Movies from '../components/Movies';
import Metas from '../components/Metas';
import { fetchMoviesFromUrl, removeMovie } from '../actions/MovieActions';
import { getMoviesFromPath } from '../utils/UrlUtils';

class ComparePage extends Component {
  static async getInitialProps({ store, asPath }) {
    await store.dispatch(fetchMoviesFromUrl(asPath));

    let movies = store
      .getState()
      .getIn(['movies', 'list'])
      .toJS();

    const movieIdsFromUrl = getMoviesFromPath(asPath).map(m =>
      parseInt(m.id, 10)
    );
    movies = movies.filter(m => movieIdsFromUrl.includes(m.id));
    movies.sort(
      (a, b) => movieIdsFromUrl.indexOf(a.id) - movieIdsFromUrl.indexOf(b.id)
    );

    return {
      movies,
      pathName: asPath
    };
  }

  render() {
    const { movies, showPageLoader, pathName, removeMovie } = this.props;
    return (
      <Layout noFooter pathName={pathName}>
        {!!movies && (
          <Movies
            movies={movies}
            removeMovie={removeMovie}
            pathName={pathName}
          />
        )}
        <Metas movies={movies} pathName={pathName} />
        {showPageLoader && <PageLoader />}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  showPageLoader: state.getIn(['movies', 'fetching'])
});

const mapDispatchToProps = () => ({ removeMovie });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparePage);
