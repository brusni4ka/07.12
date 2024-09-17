import React from 'react';
import {Link} from "react-router-dom";
import {IMovieCard} from './interfaces';

interface IMovieCardProps {
    movie: IMovieCard;
}


const MovieCard = (props: IMovieCardProps) => {
    const {movie} = props;
    return (
        <div className = "movieCard">
            <Link className ="movieCardImageLink" to = {`/movie/${movie.id}`}>
                <img className ="movieCardImage" src = {movie.poster_path}
                     alt = {movie.title}                                          
                />
            </Link>
           <div className = "movieCardInfo">
                <div className ="movieCardTitleBlock">    
                    <h6 className ="movieCardTitle">{movie.title}</h6>
                    <p className ="movieCardGenre">{movie.genres[0]}</p>
                </div>    
            <div className = "movieCardYear">    
                <p>{movie.release_date}</p>                        
            </div>    
            </div>                               
        </div>
    );
};






export default MovieCard;























