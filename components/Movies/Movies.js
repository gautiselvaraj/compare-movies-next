import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from '~/components/Movie';
import { randomColorHex } from '~/utils/CMUtils';
import './Movies.scss';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.randomColors = [];
    Array.from(Array(30)).forEach(() =>
      this.randomColors.push(randomColorHex())
    );
  }

  render() {
    const { movies, removeMovie } = this.props;

    return (
      <main className="movies-list">
        {!!movies.length &&
          movies.map((movie, i) => (
            <Movie
              key={movie.id}
              movie={movie}
              backgroundColor={this.randomColors[i]}
              removeMovie={() => removeMovie(movie)}
            />
          ))}
      </main>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  removeMovie: PropTypes.func.isRequired
};

export default Movies;
