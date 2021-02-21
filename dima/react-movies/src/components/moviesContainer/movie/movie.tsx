import React from "react";
import MovieInterface from "../../../interfaces/movieInterface";
import { Link } from "react-router-dom";
import "./movie.css";

interface MovieProps {
  movie: MovieInterface;
  hasMargin: boolean;
}
const Movie = ({ movie, hasMargin }: MovieProps) => {
  const { id, poster_path: url, title, genres, release_date: date } = movie;
  return (
    <Link
      to={`/film/${id}`}
      className={hasMargin ? "movie-card has-margin" : "movie-card"}
    >
      <img className="movie-card_img" src={url} alt={title}></img>
      <div className="movie-card_description">
        <div className="movie-card_title-genre">
          <h4 className="movie-card_title">{title}</h4>
          <p className="movie-card_genre">{genres.join(" & ")}</p>
        </div>
        <span className="movie-card_year">{date.slice(0, 4)}</span>
      </div>
    </Link>
  );
};

export default Movie;
