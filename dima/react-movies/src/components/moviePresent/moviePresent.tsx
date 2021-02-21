import React from "react";
import { Redirect } from "react-router";
import MovieInterface from "../../interfaces/movieInterface";
import Loader from "../loader";
import "./moviePresent.css";

interface MoviePresentProps {
  movie: MovieInterface | null;
  loading: boolean;
}

const MoviePresent = ({ movie, loading }: MoviePresentProps) => {
  if (movie) {
    return (
      <div className="movie-container">
        <div className="movie-img">
          <img
            className="movie-img"
            src={movie.poster_path}
            alt={movie.title}
          />
        </div>

        <div className="movie-info">
          <div className="movie-header">
            <h2 className="movie-title">{movie.title}</h2>
            <div className="movie-rating">{movie.vote_average}</div>
          </div>

          <span className="movie-tagline">{movie.tagline}</span>
          <span className="movie-date">
            {movie.release_date && new Date(movie.release_date).getFullYear()}
          </span>
          <span className="movie-runtime">
            {movie.runtime && movie.runtime + "min"}
          </span>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className="loader-cont">
        <div className="loader">
          <Loader />
        </div>
      </div>
    );
  }
  return <Redirect to="/page-not-found" />;
};

export default MoviePresent;
