import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Movie from '../Movie';
import { randomColorHex } from '../../utils/CMUtils';
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
    const { movies, removeMovie, pathName } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName="movie--animation"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        component="main"
        className="movies-list"
        style={{ minWidth: movies.length * 300 }}
      >
        {!!movies.length &&
          movies.map((movie, i) => (
            <Movie
              key={movie.id}
              movie={movie}
              backgroundColor={this.randomColors[i]}
              removeMovie={() => removeMovie(movie)}
              pathName={pathName}
              movieWidth={`${100 / movies.length}vw`}
            />
          ))}
      </ReactCSSTransitionGroup>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  removeMovie: PropTypes.func.isRequired
};

export default Movies;
