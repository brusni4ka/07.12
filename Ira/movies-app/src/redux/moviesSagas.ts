import React from 'react';
import {RequestMoviesAction, actionTypes, RequestMovieAction, RequestMoreMoviesAction,
        fetchMoreData, fetchMovies, fetchMovie, errorMovies, setScroll, requestMovies, MoviesActions} from './actions';
import {takeLatest, call, put, all, select} from 'redux-saga/effects';
import { IMovieCard } from '../components/interfaces';


const queryString = require('query-string');

interface IRequestMoviesSaga {
    data: IMovieCard[];
    total: number;
    offset: number;
    limit: number;    
}



export async function requestToServer(action: any): Promise<IMovieCard[]> {
    const urlParams = action.payload;    
    if(urlParams.sortBy === "rating") {
        urlParams.sortBy = "vote_average";
    }
    if(urlParams.searchBy === "genre") {
        urlParams.searchBy = "genres";
    }   
    const urlParamsString = queryString.stringify(urlParams);   
    const url = `https://reactjs-cdp.herokuapp.com/movies?${urlParamsString}&limit=9&sortOrder=desc`;
    const response = await fetch(url);   
    return await response.json();  
}

export async function requestToServerForMovie(action: any): Promise<IMovieCard> {
    const urlId = action.payload.id;   
    const urlIdString = String(urlId);
    const urlRequestMovie = `https://reactjs-cdp.herokuapp.com/movies/${urlIdString}`;  
    const response = await fetch(urlRequestMovie);   
    return await response.json();  
}


export async function requestToServerForGenres(url:string): Promise<IMovieCard[]> {
    const response = await fetch(url);   
    return await response.json(); 
}

function* requestMoviesSaga(action: RequestMoviesAction) {
    try {           
        const selectedMovies: IRequestMoviesSaga = yield call(requestToServer, action);        
        yield put(fetchMovies(selectedMovies.data));          
    } catch(error) {
            yield put(errorMovies());
        }
}
          
function* requestMoreMoviesSaga(action: RequestMoreMoviesAction) {
    try {           
        const selectedMovies: IRequestMoviesSaga = yield call(requestToServer, action );  
        let hasMore: boolean = yield select((store)=> store.movies.hasMore);
        let movies: IMovieCard[] = yield select((store)=> store.movies.movies);
           
        yield put(fetchMoreData(selectedMovies.data));       
        
        if (movies.length < selectedMovies.total) {
            hasMore = true;
        } else  {
            hasMore = false;
        } 
        yield put(setScroll(hasMore));

        console.log(movies.length);
        console.log(selectedMovies.total);
        console.log(hasMore);
    } catch(error) {
        yield put(errorMovies());
    } 
}
    
function* requestMovieSaga(action: RequestMovieAction) {  
               
    try {                            
        const selectedMovie: IMovieCard = yield call(requestToServerForMovie, action);       
        yield put(fetchMovie(selectedMovie));                    
        if(selectedMovie) {
        const urlRequestGenres = `https://reactjs-cdp.herokuapp.com/movies?sortBy=rating&sortOrder=desc&filter=${selectedMovie.genres[0]}&limit=9`;                            
            const moviesByGenre: IRequestMoviesSaga = yield call(requestToServerForGenres, urlRequestGenres);                          
            yield put(fetchMovies(moviesByGenre.data));
        }               
    } catch(error) {
        yield put(errorMovies());
    }    
}    




const requestMoviesSubscribe = () => {
    return takeLatest(actionTypes.REQUEST_MOVIES, requestMoviesSaga);
}

const requestMoreDataSubscribe = () => {
    return takeLatest(actionTypes.REQUEST_MORE_MOVIES, requestMoreMoviesSaga);
}

const requestMovieSubscribe = () => {
    return takeLatest(actionTypes.REQUEST_MOVIE, requestMovieSaga);
}

export function* moviesSagas() {     
     yield all ([
        requestMoviesSubscribe(), requestMoreDataSubscribe(), requestMovieSubscribe()
    ]);
}
