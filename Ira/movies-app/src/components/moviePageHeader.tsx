import React from 'react';
import {Link} from "react-router-dom";
import {IMovieCard} from './interfaces';
import MovieDescription from './movieDescription';


interface IMovieDescriptionProps {
    movie: IMovieCard;    
}


const MoviePageHeader = (props: IMovieDescriptionProps)=> {
 
    return (  
        <>      
            <header className="moviePageHeader">
                <div className = "moviePageHeaderTop">                
                    <Link className = "logoLink" to = "/">netflixroulette</Link>
                    <Link className = "moviePageHeaderButtonLink" to = "/" ><button type = "button" className = "moviePageHeaderButton">search</button></Link>
                </div>
                { props.movie !== undefined ?
                <MovieDescription movie = {props.movie}/>
                : <p className = "descriptionNotFound">film not found</p>
                }
            </header>  
            <div className="headerBottomBlock">
                <div className="moviesGenreBlock">
                  <p className="moviesGenre">Films by {props.movie.genres[0]} genre</p>                            
                </div> 
            </div>    
        </>
    );  
 

};







export default MoviePageHeader;