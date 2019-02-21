const client = typeof window !== 'undefined';

export default error =>
  isClient && typeof Rollbar !== 'undefined' && Rollbar.error(error);
