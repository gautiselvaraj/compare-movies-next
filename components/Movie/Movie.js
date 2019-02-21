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
  logCrewOpened
} from '../../utils/GAUtils';
import Poster from '../Poster';
import Votes from '../Votes';
import MediaModal from '../MediaModal';
import Languages from '../Languages';
import SeasonEpisodes from '../SeasonEpisodes';
import BoxOffice from '../BoxOffice';
import Credits from '../Credits';
import RelatedContainer from '../../containers/RelatedContainer';
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

  componentDidCatch(error, errorInfo) {
    logRollbarError(error);
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

    const productionInfo = movie.production
      ? movie.production
      : movie.production_companies
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

    const commonJsonLdAttrs = {
      name: movie.title || movie.name,
      description: movie.overview,
      datePublished: formatedDate(
        movie.release_date || movie.first_air_date,
        'iso8601'
      ),
      dateCreated: formatedDate(
        movie.release_date || movie.first_air_date,
        'iso8601'
      ),
      genre: movie.genres.map(g => g.name).join(', '),
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
            <Votes movie={movie} />
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
              {movie.networks ? (
                <span className="box-office tooltip" data-title="Network">
                  {movie.networks.map(n => n.name).join(',')}
                </span>
              ) : (
                <BoxOffice revenue={movie.revenue} />
              )}
            </span>
          </div>
          <div className="movie__misc">
            {director ? (
              <span
                className="movie__director tooltip"
                data-title="Directed By"
              >
                {director.name}
              </span>
            ) : creators ? (
              <span className="movie__director tooltip" data-title="Created By">
                {creators}
              </span>
            ) : null}
          </div>
          <div className="movie__awards">
            {movie.awards && movie.awards !== 'N/A' ? (
              <span>{movie.awards}</span>
            ) : (
              <span className="movie__no-info">No Awards Info</span>
            )}
          </div>
          <div className="movie__production">
            {productionInfo ? (
              <span className="tooltip" data-title="Production Company">
                {productionInfo}
              </span>
            ) : (
              <span className="movie__no-info">No Production Company Info</span>
            )}
          </div>
          <div className="movie__dvd-release-date">
            {movie.dvdReleaseDate && movie.dvdReleaseDate !== 'N/A' ? (
              <span className="tooltip" data-title="DVD Release Date">
                {formatedDate(movie.dvdReleaseDate, 'long')}
              </span>
            ) : (
              <span className="movie__no-info">No DVD Release Date</span>
            )}
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
            <ShowMoreText
              onClick={() => logOverviewOpened(this.logLabel)}
              anchorClass="movie__more-link"
              more="more"
              less={false}
            >
              {movie.overview}
            </ShowMoreText>
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

        <JSONLD>
          {movie.media_type === 'movie' ? (
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
                  ratingValue: getAggregateRating(movie),
                  ratingCount: getAggregateRatingCount(movie)
                }}
              />
              <Generic
                type="countryOfOrigin"
                jsonldtype="Country"
                schema={{ name: countries[0].name }}
              />
              <Generic
                type="productionCompany"
                jsonldtype="Organization"
                schema={{
                  name:
                    movie.production || movie.production_companies
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
                  ratingValue: getAggregateRating(movie),
                  ratingCount: getAggregateRatingCount(movie)
                }}
              />
              <Generic
                type="countryOfOrigin"
                jsonldtype="Country"
                schema={{ name: countries[0].name }}
              />
              <Generic
                type="productionCompany"
                jsonldtype="Organization"
                schema={{
                  name:
                    movie.production || movie.production_companies
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
