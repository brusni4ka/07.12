import { IMovieCard } from "../components/interfaces";




export type MoviesActions = RequestMoviesAction | FetchMoviesAction | ErrorMoviesAction 
 | RequestMovieAction | FetchMovieAction| RequestMoreMoviesAction | FetchMoreMoviesAction
 | ClearMoviesAction | SetScrollAction;

export enum actionTypes {
   REQUEST_MOVIES = 'REQUEST_MOVIES',
   FETCH_MOVIES = 'FETCH_MOVIES',   
   ERROR_MOVIES = 'ERROR_MOVIES',
   REQUEST_MOVIE = 'REQUEST_MOVIE',
   FETCH_MOVIE = 'FETCH_MOVIE', 
   REQUEST_MORE_MOVIES = 'REQUEST_MORE_MOVIES',
   FETCH_MORE_MOVIES = 'FETCH_MORE_MOVIES',   
   CLEAR_MOVIES = 'CLEAR_MOVIES',
   SET_SCROLL = 'SET_SCROLL'
}

export interface RequestMoviesAction {
    type: actionTypes.REQUEST_MOVIES;
    payload: {        
        sortBy?: string;
        search?: string;
        searchBy?: string;               
    }
}

export const requestMovies = (sortBy?: string, search?: string, searchBy?: string ): RequestMoviesAction => ({
    type: actionTypes.REQUEST_MOVIES, 
    payload: {          
        sortBy,
        search,
        searchBy             
    }    
}); 

export interface FetchMoviesAction {
    type: actionTypes.FETCH_MOVIES;
    movies: IMovieCard[];
}

export const fetchMovies = (movies: IMovieCard[]): FetchMoviesAction => ({
    type: actionTypes.FETCH_MOVIES,
    movies
});

export interface RequestMoreMoviesAction {
    type: actionTypes.REQUEST_MORE_MOVIES; 
    payload: {        
        sortBy?: string;
        search?: string;
        searchBy?: string;
        offset?: number;                                        
    } 
    
}

export const requestMoreMovies = ( offset?: number, sortBy?: string, search?: string, searchBy?: string ): RequestMoreMoviesAction => ({
    type: actionTypes.REQUEST_MORE_MOVIES,
    payload: {        
        sortBy,
        search,
        searchBy,
        offset,                      
    }    
});


export interface FetchMoreMoviesAction {
    type: actionTypes.FETCH_MORE_MOVIES;
    movies: IMovieCard[];    
}

export const fetchMoreData = (movies: IMovieCard[]): FetchMoreMoviesAction => ({
    type: actionTypes.FETCH_MORE_MOVIES,
    movies     
});

export interface ErrorMoviesAction {
    type: actionTypes.ERROR_MOVIES;    
}

export const errorMovies = (): ErrorMoviesAction => ({
    type: actionTypes.ERROR_MOVIES,    
});

export interface RequestMovieAction {
    type: actionTypes.REQUEST_MOVIE;
    payload: {
       id: number;
    }
}

export const requestMovie = (id: number): RequestMovieAction => ({
    type: actionTypes.REQUEST_MOVIE, 
    payload: {
       id    
    }
}); 

export interface FetchMovieAction {
    type: actionTypes.FETCH_MOVIE;
    movie: IMovieCard;    
}

export const fetchMovie = (movie: IMovieCard): FetchMovieAction => ({
    type: actionTypes.FETCH_MOVIE,
    movie    
});

export interface ClearMoviesAction {
    type: actionTypes.CLEAR_MOVIES;
}

export const clearMovies = (): ClearMoviesAction => ({
    type: actionTypes.CLEAR_MOVIES,
});

export interface SetScrollAction {
    type: actionTypes.SET_SCROLL;
    hasMore: boolean;  
}

export const setScroll = (hasMore: boolean): SetScrollAction => ({
    type: actionTypes.SET_SCROLL,
    hasMore  
});