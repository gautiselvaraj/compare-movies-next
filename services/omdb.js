const fetch = require('node-fetch');

module.exports = async id => {
  try {
    const rawResponse = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
    );
    const response = await rawResponse.json();
    const { Awards, Ratings = [], imdbVotes, DVD, Production } = response;
    return {
      awards: Awards,
      ratings: Ratings.map(r =>
        r.Source === 'Internet Movie Database' ? { ...r, imdbVotes } : r
      ),
      dvdReleaseDate: DVD,
      production: Production
    };
  } catch (err) {
    return {};
  }
};
