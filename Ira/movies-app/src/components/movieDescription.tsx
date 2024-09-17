
import {IMovieCard} from './interfaces';



interface IMovieDescription {
    movie: IMovieCard;        
}



const MovieDescription = (props: IMovieDescription)=> {
    console.log(props);
    const {id, poster_path, title, vote_average, release_date, runtime, overview, genres} = props.movie;
    return (
        <>
            <div className = "movieDetailsBlock">
                <div className = "movieCardWrapper" key = {id}>
                    <img src = {poster_path} width = "300"                                    
                    />          
                </div>  
                                    
                <div className = "movieInfo">
                    <div className = "movieInfoTitleAndRating">
                        <h5 className = "movieInfoTitle">{title}</h5>
                        <span className = "movieInfoRating">{vote_average}</span>
                    </div>    
                    <p className = "movieInfoGenre">{genres[0]}</p> 
                    <div className = "movieInfoDateAndTime">
                        <p className = "movieInfoDate">{release_date}</p>
                        <p className = "movieInfoTime">{runtime} min</p>   
                    </div>
                    <p className = "movieInfoOverview">{overview}</p>  
                </div>            
           </div>      
        
        </>
    );

};




export default MovieDescription;