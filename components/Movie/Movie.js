import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emojiFlags from 'emoji-flags';
import ShowMoreText from 'react-show-more-text';
import {
  formatedDate,
  formatedRunTime,
  mergeUniqMovieArrays,
  getAggregateRating,
  getAggregateRatingCount
} from '../../utils/CMUtils';
import { getBackdropPath } from '../../utils/tmdbUtils';
import {
  logImagesOpened,
  logVideosOpened,
  logSeasonsOpened,
  logLanguagesOpened,
  logRelatedOpened,
  logOverviewOpened,
  logCastOpened,
  logCrewOpened,
  logProductionInfoExpanded,
  logAwardsInfoExpanded,
  logGenreInfoExpanded
} from '../../utils/GAUtils';
import Poster from '../Poster';
import Votes from '../Votes';
import MediaModal from '../MediaModal';
import Languages from '../Languages';
import SeasonEpisodes from '../SeasonEpisodes';
import BoxOffice from '../BoxOffice';
import Credits from '../Credits';
import Related from '../Related';
import './Movie.scss';
import { JSONLD, Generic } from 'react-structured-data';
import logRollbarError from '../../utils/rollbar';

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

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.scroll({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });
    }
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

  componentDidCatch(error) {
    logRollbarError(error);
  }

  render() {
    const { movie, backgroundColor, removeMovie, pathName } = this.props;
    const { showImages, showVideos } = this.state;

    const movieName = movie.title || movie.name;
    const isMovie = movie.media_type === 'movie';
    const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : '';

    const movieVideosPresent = !!movie.videos.results.length;
    const movieImagesPresent = !![
      ...movie.images.posters,
      ...movie.images.backdrops
    ].length;

    let countries = !isMovie
      ? movie.origin_country && movie.origin_country.length
        ? [{ iso_3166_1: movie.origin_country[0] }]
        : []
      : movie.production_countries;
    countries = countries.map(c => emojiFlags.countryCode(c.iso_3166_1));
    countries = countries.filter(c => c);

    const productionInfo = movie.production
      ? movie.production
      : movie.production_companies && movie.production_companies.length
      ? movie.production_companies.map(p => p.name).join(', ')
      : false;
    const director = movie.credits.crew.find(c => c.job === 'Director');
    const creators = movie.created_by
      ? movie.created_by.map(c => c.name).join(', ')
      : null;

    let similarArray = movie.similar.results;
    let recommendedArray = movie.recommendations.results;
    similarArray.forEach(a => (a.media_type = movie.media_type));
    recommendedArray.forEach(a => (a.media_type = movie.media_type));

    const aggregateRating = getAggregateRating(movie);
    const aggregateRatingCount = getAggregateRatingCount(movie);

    const commonJsonLdAttrs = {
      name: movieName,
      description: movie.overview,
      datePublished: formatedDate(
        movie.release_date || movie.first_air_date,
        'iso8601'
      ),
      dateCreated: formatedDate(
        movie.release_date || movie.first_air_date,
        'iso8601'
      ),
      genre: genres,
      awards: movie.awards,
      image: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
      inLanguage: movie.translations.translations
        .map(t => t.iso_639_1)
        .join(',')
    };

    return (
      <div
        className="movie"
        style={{
          backgroundColor,
          backgroundImage: `url('${getBackdropPath(movie.backdrop_path, 200)}')`
        }}
      >
        <div className="movie__container">
          <button
            className="movie__poster"
            onClick={() => this.showImages(this.posterButton)}
            ref={i => (this.posterButton = i)}
            aria-label={movieName}
          >
            <Poster
              size={135}
              path={movie.poster_path}
              alt={movieName}
              className="movie__image"
            />
          </button>
        </div>

        <div className="movie__container movie__container--xs">
          <span className="movie__type">{isMovie ? 'Movie' : 'TV Show'}</span>
          {movie.adult && (
            <span
              className="movie__adult tooltip"
              aria-label={`Adult ${isMovie ? 'Movie' : 'Show'}`}
            >
              <i className="fa fa-exclamation-triangle movie__adult-icon" />
              18+
            </span>
          )}
        </div>

        <div className="movie__container">
          <h5 className="movie__title" aria-label="Name">
            {movieName}
          </h5>
        </div>

        <div className="movie__vote movie__container">
          <Votes movie={movie} />
        </div>

        <div className="movie__medias movie__container">
          {movieVideosPresent && (
            <span className="movie__videos">
              <button
                className="movie__videos-button"
                onClick={this.showVideos}
                ref={v => (this.videoButton = v)}
                aria-label="Teasers, trailers and other videos"
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
                aria-label="Covers, posters and other images"
              >
                Images
              </button>
            </span>
          )}
          {movieVideosPresent && showVideos && (
            <MediaModal
              show={true}
              movie={movie}
              onClose={this.hideVideos}
              type="videos"
            />
          )}
          {movieImagesPresent && showImages && (
            <MediaModal
              show={true}
              movie={movie}
              onClose={this.hideImages}
              type="images"
            />
          )}
        </div>

        <div
          className="movie__misc movie__countries movie__container"
          aria-label="Countries"
        >
          {countries.map(c => (
            <span key={c.code} className="movie__country">
              <span className="movie__country-emoji">{c.emoji}</span>
              {c.name}
            </span>
          ))}
        </div>

        <div className="movie__misc movie__misc--centered movie__container">
          {isMovie ? (
            !!movie.runtime && (
              <span className="movie__runtime tooltip" aria-label="Runtime">
                {formatedRunTime(movie.runtime)}
              </span>
            )
          ) : (
            <span className="movie__seasons-episodes">
              <SeasonEpisodes
                seasonCount={movie.number_of_seasons}
                episodeCount={movie.number_of_episodes}
                seasons={movie.seasons}
                movieTitle={movieName}
                onModalOpen={() => logSeasonsOpened(this.logLabel)}
              />
            </span>
          )}
          <span
            className="movie__date tooltip"
            aria-label={isMovie ? 'Released Date' : 'First Air Date'}
          >
            {formatedDate(movie.release_date || movie.first_air_date, 'long')}
          </span>
        </div>

        <div
          className="movie__misc movie__genres movie__container"
          aria-label="Genres"
        >
          <ShowMoreText
            onClick={() => logGenreInfoExpanded(this.logLabel)}
            anchorClass="movie__more-link"
            more="more"
            less="less"
            lines={1}
          >
            {genres}
          </ShowMoreText>
        </div>

        <div className="movie__misc movie__misc--centered movie__container">
          <span className="movie__status tooltip" aria-label="Status">
            {movie.status}
          </span>
          {movie.networks ? (
            <span className="movie__network tooltip" aria-label="Network">
              {movie.networks.map(n => n.name).join(',')}
            </span>
          ) : (
            <BoxOffice revenue={movie.revenue} />
          )}
        </div>

        <div className="movie__misc movie__container">
          {director ? (
            <span className="movie__director tooltip" aria-label="Directed By">
              {director.name}
            </span>
          ) : creators ? (
            <span className="movie__director tooltip" aria-label="Created By">
              {creators}
            </span>
          ) : null}
        </div>

        <div
          className="movie__misc movie__awards movie__container"
          aria-label="Awards"
        >
          {movie.awards && movie.awards !== 'N/A' ? (
            <ShowMoreText
              onClick={() => logAwardsInfoExpanded(this.logLabel)}
              anchorClass="movie__more-link"
              more="more"
              less="less"
              lines={1}
            >
              {movie.awards}
            </ShowMoreText>
          ) : (
            <span className="movie__no-info">No Awards Info</span>
          )}
        </div>

        <div className="movie__misc movie__production movie__container">
          {productionInfo ? (
            <div className="tooltip" aria-label="Production Company">
              <ShowMoreText
                onClick={() => logProductionInfoExpanded(this.logLabel)}
                anchorClass="movie__more-link"
                more="more"
                less="less"
                lines={1}
              >
                {productionInfo}
              </ShowMoreText>
            </div>
          ) : (
            <span className="movie__no-info">No Production Company Info</span>
          )}
        </div>

        <div className="movie__misc movie__dvd-release-date movie__container">
          {movie.dvdReleaseDate && movie.dvdReleaseDate !== 'N/A' ? (
            <span className="tooltip" aria-label="DVD Release Date">
              {formatedDate(movie.dvdReleaseDate, 'long')}
            </span>
          ) : (
            <span className="movie__no-info">No DVD Release Date</span>
          )}
        </div>

        <div className="movie__languages movie__container">
          <Languages
            translations={movie.translations.translations}
            movieTitle={movieName}
            onModalOpen={() => logLanguagesOpened(this.logLabel)}
            orginalLanguageCode={movie.original_language}
          />
        </div>

        <div className="movie__related movie__container">
          <Related
            related={mergeUniqMovieArrays(recommendedArray, similarArray)}
            movieTitle={movieName}
            movieType={movie.media_type}
            onModalOpen={() => logRelatedOpened(this.logLabel)}
            pathName={pathName}
          />
        </div>

        <div className="movie__overview movie__container" aria-label="Overview">
          <ShowMoreText
            onClick={() => logOverviewOpened(this.logLabel)}
            anchorClass="movie__more-link"
            more="more"
            less="less"
          >
            {movie.overview}
          </ShowMoreText>
        </div>

        <div className="movie__cast-crew movie__container">
          {movie.credits.cast.length > 1 && (
            <Credits
              credits={movie.credits.cast}
              movieTitle={movieName}
              type="cast"
              onModalOpen={() => logCastOpened(this.logLabel)}
            />
          )}
        </div>

        <div className="movie__cast-crew movie__container">
          {movie.credits.crew.length > 1 && (
            <Credits
              credits={movie.credits.crew}
              movieTitle={movieName}
              type="crew"
              onModalOpen={() => logCrewOpened(this.logLabel)}
            />
          )}
        </div>

        <button
          onClick={removeMovie}
          className="movie__remove"
          aria-label={`Remove ${movieName}`}
        >
          &times;
        </button>

        <JSONLD>
          {isMovie ? (
            <Generic
              type="Movie"
              jsonldtype="Movie"
              schema={{
                ...commonJsonLdAttrs,
                duration: `T${formatedRunTime(movie.runtime, 'short')}`
              }}
            >
              <Generic
                type="aggregateRating"
                jsonldtype="AggregateRating"
                schema={{
                  bestRating: 10,
                  ratingValue: aggregateRating,
                  ratingCount: aggregateRatingCount
                }}
              />
              <Generic
                type="countryOfOrigin"
                jsonldtype="Country"
                schema={{
                  name: countries && countries.length ? countries[0].name : ''
                }}
              />
              <Generic
                type="productionCompany"
                jsonldtype="Organization"
                schema={{
                  name:
                    movie.production ||
                    (movie.production_companies &&
                      movie.production_companies.length)
                      ? movie.production_companies[0].name
                      : ''
                }}
              />
              <Generic
                type="director"
                jsonldtype="Person"
                schema={{ name: director ? director.name : '' }}
              />
            </Generic>
          ) : (
            <Generic
              type="TVSeries"
              jsonldtype="TVSeries"
              schema={{
                ...commonJsonLdAttrs,
                numberOfEpisodes: movie.number_of_episodes,
                numberOfSeasons: movie.number_of_seasons
              }}
            >
              <Generic
                type="aggregateRating"
                jsonldtype="AggregateRating"
                schema={{
                  bestRating: 10,
                  ratingValue: aggregateRating,
                  ratingCount: aggregateRatingCount
                }}
              />
              <Generic
                type="countryOfOrigin"
                jsonldtype="Country"
                schema={{
                  name: countries && countries.length ? countries[0].name : ''
                }}
              />
              <Generic
                type="productionCompany"
                jsonldtype="Organization"
                schema={{
                  name:
                    movie.production ||
                    (movie.production_companies &&
                      movie.production_companies.length)
                      ? movie.production_companies[0].name
                      : ''
                }}
              />
            </Generic>
          )}
        </JSONLD>
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
