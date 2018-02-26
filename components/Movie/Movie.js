import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emojiFlags from 'emoji-flags';
import Shorten from 'react-shorten';
import {
  formatedDate,
  formatedRunTime,
  mergeUniqMovieArrays
} from '~/utils/CMUtils';
import { getBackdropPath } from '~/utils/tmdbUtils';
import {
  logImagesOpened,
  logVideosOpened,
  logSeasonsOpened,
  logLanguagesOpened,
  logRelatedOpened,
  logOverviewOpened,
  logCastOpened,
  logCrewOpened
} from '~/utils/GAUtils';
import Poster from '~/components/Poster';
import Vote from '~/components/Vote';
import MediaModal from '~/components/MediaModal';
import Languages from '~/components/Languages';
import SeasonEpisodes from '~/components/SeasonEpisodes';
import Profit from '~/components/Profit';
import Credits from '~/components/Credits';
import RelatedContainer from '~/containers/RelatedContainer';
import './Movie.scss';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { showVideos: false, showImages: false };

    const movie = this.props.movie;
    this.logLabel = `${movie.media_type}-${movie.id}`;

    this.showImages = this.showImages.bind(this);
    this.showVideos = this.showVideos.bind(this);
    this.hideImages = this.hideImages.bind(this);
    this.hideVideos = this.hideVideos.bind(this);
  }

  showImages(returnFocus) {
    logImagesOpened(this.logLabel);
    this.setState({ showImages: true, returnFocus });
  }

  showVideos() {
    logVideosOpened(this.logLabel);
    this.setState({ showVideos: true });
  }

  hideImages() {
    const returnFocus = this.state.returnFocus;
    this.setState({ showImages: false, returnFocus: null });
    returnFocus && returnFocus.focus();
  }

  hideVideos() {
    this.setState({ showVideos: false });
    this.videoButton.focus();
  }

  render() {
    const { movie, backgroundColor, removeMovie } = this.props;
    const { showImages, showVideos } = this.state;
    const movieVideosPresent = !!movie.videos.results.length;
    const movieImagesPresent = !![
      ...movie.images.posters,
      ...movie.images.backdrops
    ].length;

    let countries =
      movie.media_type === 'tv'
        ? [{ iso_3166_1: movie.origin_country[0] }]
        : movie.production_countries;
    countries = countries.map(c => emojiFlags.countryCode(c.iso_3166_1));

    let similarArray = movie.similar.results;
    let recommendedArray = movie.recommendations.results;
    similarArray.forEach(a => (a.media_type = movie.media_type));
    recommendedArray.forEach(a => (a.media_type = movie.media_type));

    return (
      <div
        className="movie"
        style={{
          backgroundColor,
          backgroundImage: `url('${getBackdropPath(movie.backdrop_path, 200)}')`
        }}
      >
        <div className="movie__container">
          <div className="movie__poster">
            <button
              className="movie__poster-button"
              onClick={() => this.showImages(this.posterButton)}
              ref={i => (this.posterButton = i)}
              data-title={movie.title || movie.name}
            >
              <Poster
                size={135}
                path={movie.poster_path}
                alt={movie.title || movie.name}
                className="movie__image"
              />
            </button>
          </div>
          <div className="movie__misc">
            <span className="movie__type">
              {movie.media_type === 'movie' ? movie.media_type : 'TV Show'}
            </span>
            {movie.adult && (
              <span
                className="movie__adult tooltip"
                data-title={`Adult ${
                  movie.media_type === 'tv' ? 'Show' : 'Movie'
                }`}
              >
                <i className="fa fa-exclamation-triangle movie__adult-icon" />
                18+
              </span>
            )}
          </div>
          <h5 className="movie__title">{movie.title || movie.name}</h5>
          <div className="movie__vote">
            <Vote
              vote={movie.vote_average}
              type="big"
              noRatingText={true}
              noRatingClass="movie__no-info"
            />
          </div>
          <div className="movie__medias">
            {movieVideosPresent && (
              <span className="movie__videos">
                <button
                  className="movie__videos-button"
                  onClick={this.showVideos}
                  ref={v => (this.videoButton = v)}
                >
                  Videos
                </button>
              </span>
            )}
            {movieImagesPresent && (
              <span className="movie__images">
                <button
                  className="movie__images-button"
                  onClick={() => this.showImages(this.imageButton)}
                  ref={i => (this.imageButton = i)}
                >
                  Images
                </button>
              </span>
            )}
            {movieVideosPresent &&
              showVideos && (
                <MediaModal
                  show={true}
                  movie={movie}
                  onClose={this.hideVideos}
                  type="videos"
                />
              )}
            {movieImagesPresent &&
              showImages && (
                <MediaModal
                  show={true}
                  movie={movie}
                  onClose={this.hideImages}
                  type="images"
                />
              )}
          </div>
          <div className="movie__countries">
            {countries.map(c => (
              <span key={c.code} className="movie__country">
                <span className="movie__country-emoji">{c.emoji}</span>
                {c.name}
              </span>
            ))}
          </div>
          <div className="movie__misc">
            {movie.media_type === 'movie' ? (
              !!movie.runtime && (
                <div className="movie__runtime tooltip" data-title="Runtime">
                  {formatedRunTime(movie.runtime)}
                </div>
              )
            ) : (
              <div
                className="movie__seasons-episodes tooltip"
                data-title="Seasons & Episodes"
              >
                <SeasonEpisodes
                  seasonCount={movie.number_of_seasons}
                  episodeCount={movie.number_of_episodes}
                  seasons={movie.seasons}
                  movieTitle={movie.title || movie.name}
                  onModalOpen={() => logSeasonsOpened(this.logLabel)}
                />
              </div>
            )}
            <span
              className="movie__date tooltip"
              data-title={
                movie.media_type === 'movie'
                  ? 'Released Date'
                  : 'First Air Date'
              }
            >
              {formatedDate(movie.release_date || movie.first_air_date, 'long')}
            </span>
          </div>
          <div className="movie__genres">
            {movie.genres.map(g => (
              <span key={g.id} className="movie__genre">
                {g.name}
              </span>
            ))}
          </div>
          <div className="movie__misc">
            <span className="movie__status tooltip" data-title="Status">
              {movie.status}
            </span>
            <span className="movie__money">
              <Profit budget={movie.budget} revenue={movie.revenue} />
            </span>
          </div>
          <div className="movie__languages">
            <Languages
              translations={movie.translations.translations}
              movieTitle={movie.title || movie.name}
              onModalOpen={() => logLanguagesOpened(this.logLabel)}
              orginalLanguageCode={movie.original_language}
            />
          </div>
          <div className="movie__related">
            <RelatedContainer
              related={mergeUniqMovieArrays(recommendedArray, similarArray)}
              movieTitle={movie.title || movie.name}
              movieType={movie.media_type}
              onModalOpen={() => logRelatedOpened(this.logLabel)}
            />
          </div>
          <div className="movie__overview">
            <Shorten
              onExpand={() => logOverviewOpened(this.logLabel)}
              ellipsisClassName="movie__more-link"
            >
              {movie.overview}
            </Shorten>
          </div>

          <div className="movie__cast-crew">
            {movie.credits.cast.length > 1 && (
              <Credits
                credits={movie.credits.cast}
                movieTitle={movie.title || movie.name}
                type="cast"
                onModalOpen={() => logCastOpened(this.logLabel)}
              />
            )}
          </div>
          <div className="movie__cast-crew">
            {movie.credits.crew.length > 1 && (
              <Credits
                credits={movie.credits.crew}
                movieTitle={movie.title || movie.name}
                type="crew"
                onModalOpen={() => logCrewOpened(this.logLabel)}
              />
            )}
          </div>
          <button onClick={removeMovie} className="movie__remove">
            &times;
          </button>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  removeMovie: PropTypes.func.isRequired
};

export default Movie;
