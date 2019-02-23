import ReactGA from 'react-ga';
import { GATrackingId } from '../constants/GAConstants';

const isProd = process.env.NODE_ENV === 'production';
const client = typeof window !== 'undefined';
let initializedGA = false;

const initGA = () => {
  if (initializedGA) {
    return;
  }

  ReactGA.initialize(GATrackingId);
  initializedGA = true;
};

const logMe = (category, action, label) => {
  if (isProd && client) {
    initGA();
    label = JSON.stringify(label);
    ReactGA.event({ category, action, label });
  }
};

export const recordPageView = path => {
  if (isProd && client) {
    path = path || window.location.pathname;
    initGA();
    ReactGA.pageview(path);
  }
};

export const logSearch = label => logMe('Search', 'Searched', label);

export const logMovieAdd = label => logMe('Movie', 'Added', label);

export const logMovieRemove = label => logMe('Movie', 'Removed', label);

export const logMovieFailed = label => logMe('Movie', 'Failed', label);

export const logImagesOpened = label => logMe('Movie', 'Images Opened', label);

export const logVideosOpened = label => logMe('Movie', 'Videos Opened', label);

export const logSeasonsOpened = label =>
  logMe('Movie', 'Seasons Opened', label);

export const logLanguagesOpened = label =>
  logMe('Movie', 'Languages Opened', label);

export const logRelatedOpened = label =>
  logMe('Movie', 'Related Opened', label);

export const logRelatedAdded = label =>
  logMe('Movie', 'Related Movie Added', label);

export const logHomeMovieAdded = label =>
  logMe('Movie', 'Home Movie Added', label);

export const logOverviewOpened = label =>
  logMe('Movie', 'Overview Opened', label);

export const logCastOpened = label => logMe('Movie', 'Cast Opened', label);

export const logCrewOpened = label => logMe('Movie', 'Crew Opened', label);
