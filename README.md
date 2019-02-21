# [Compare Movies](https://www.comparemovies.info)

#### Confused about what to watch? Compare movies and TV shows and make informed decisions.

Compare Movies is a web app which compares movies and TV shows. Users can watch trailers and compare stats like ratings from IMDB, TMDB, Rotten Tomatoes and Metacritic, runtime, genres, release date, status, season & episode details, cast, crew, overview and so on with ease.

![Compare Movies Demo](compare-movies-demo-v2.gif)

## Getting Started

Clone this repo

```
git clone https://github.com/gautiselvaraj/compare-movies.git
cd compare-movies
```

Install Dependencies
```yarn```

Apply and get API key from [TMDb](https://www.themoviedb.org/settings/api) and from [OMDB](http://www.omdbapi.com/apikey.aspx)

Create a file called `now-secrets.json` and add the following
```
{
  "@tmdb-api-key": "<Your-TMDB-Key>",
  "@omdb-api-key": "<Your-OMDB-Key>"
}
```


Start the server
```yarn dev```

## Authors

**[Gauti Selvaraj](https://www.gauti.info)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
