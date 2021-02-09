import ActionTypes from "../enums/ActionTypes";
import { MoviesStateInterface } from "../interfaces/stateInterface";
import { MoviesAction } from "./moviesActions";
const moviesReducer = (
  state: MoviesStateInterface = {
    movies: { data: [], total: 0, offset: 0, limit: 0 },
    loadingMovie: true,
    loadingMovies: true,
    movie: null,
  },
  action: MoviesAction
) => {
  switch (action.type) {
    case ActionTypes.SET_MOVIES:
      return { ...state, ...action.payload };
    case ActionTypes.FETCH_MOVIES:
      return { ...state, loadingMovies: action.payload.loadingMovies };
    case ActionTypes.FETCH_MOVIE:
      return { ...state, loadingMovie: true };
    case ActionTypes.SET_MOVIE:
      return { ...state, ...action.payload };
    case ActionTypes.RESET_MOVIES:
      return {
        ...state,
        movies: { data: [], total: 0, offset: 0, limit: 9 },
        loadingMovies: true,
      };
    case ActionTypes.RESET_MOVIE:
      return {
        ...state,
        movie: null,
        loadingMovie: true,
      };
    default:
      return state;
  }
};

export default moviesReducer;
