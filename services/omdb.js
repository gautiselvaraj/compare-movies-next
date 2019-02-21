const fetch = require('node-fetch');

module.exports = async id => {
  try {
    const rawResponse = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
    );
    const response = await rawResponse.json();
    return {
      awards: response.Awards,
      ratings: response.Ratings.map(r =>
        r.Source === 'Internet Movie Database'
          ? { ...r, imdbVotes: response.imdbVotes }
          : r
      ),
      dvdReleaseDate: response.DVD,
      production: response.Production
    };
  } catch (err) {
    return {};
  }
};
