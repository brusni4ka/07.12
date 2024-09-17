
import {IMovieCard} from '../components/interfaces';
import {actionTypes, MoviesActions} from './actions';




export interface moviesAppState {
   movies: IMovieCard[];   
   movie: IMovieCard | null;
   loading: boolean;
   hasMore: boolean;   
}

const initialState: moviesAppState = {
    movies: [], 
    movie: null, 
    loading: false,
    hasMore: true    
};




export const moviesReducer = (state = initialState, action: MoviesActions) => {
    
    switch(action.type) {
        case actionTypes.REQUEST_MOVIES: {
            return {
                ...state,
                loading: true
            }
        } 
        case actionTypes.FETCH_MOVIES: {                   
            return {
                ...state,
                movies: action.movies,
                loading: false
            }         
        }
        case actionTypes.REQUEST_MORE_MOVIES: {
            return {
                ...state,
                loading: true,                                
            }
        }
        case actionTypes.FETCH_MORE_MOVIES: {                   
            return {
                ...state,                 
                movies: [...state.movies, ...action.movies],                  
                loading: false                           
            }         
        }
    
        case actionTypes.ERROR_MOVIES: {
            return {
                ...state,                
                loading: false                
            }
        } 
        
        case actionTypes.REQUEST_MOVIE: {
            return {
                ...state,
                loading: true
            }
        } 

        case actionTypes.FETCH_MOVIE: {                   
            return {
                ...state,
                movie: action.movie,
                loading: false
            }         
        }
       
        case actionTypes.CLEAR_MOVIES: {            
            return initialState;            
        } 
        
        case actionTypes.SET_SCROLL: {
            return {
                ...state,
                hasMore: action.hasMore
            }
        }

        default: return state;  
    }


};