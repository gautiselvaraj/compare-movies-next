import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Metas from '~/components/Metas';
import Movies from '~/components/Movies';
import PageLoader from '~/components/PageLoader';
import SuggestsContainer from '~/containers/SuggestsContainer';

class Body extends Component {
  constructor() {
    super();
    this.state = { moviesFetchedFromUrl: false };
  }

  componentDidMount() {
    this.props.fetchMoviesFromUrl();
    this.setState({ moviesFetchedFromUrl: true });
  }

  render() {
    const { movies, removeMovie, moviesAvailable, showPageLoader } = this.props;

    if (!this.state.moviesFetchedFromUrl) {
      return null;
    }

    return (
      <div>
        {moviesAvailable ? (
          <Movies movies={movies} removeMovie={removeMovie} />
        ) : (
          <SuggestsContainer />
        )}
        <Metas movies={movies} />
        {showPageLoader && <PageLoader />}
      </div>
    );
  }
}

Body.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  removeMovie: PropTypes.func.isRequired,
  fetchMoviesFromUrl: PropTypes.func.isRequired,
  moviesAvailable: PropTypes.bool.isRequired,
  showPageLoader: PropTypes.bool.isRequired
};

export default Body;
