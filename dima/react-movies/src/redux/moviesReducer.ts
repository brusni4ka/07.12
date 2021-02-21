import MovieInterface from "../interfaces/movieInterface";
import { MoviesStateInterface } from "../interfaces/stateInterface";
// import { MoviesAction, setMovies } from "./moviesActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URLMovieParams } from "./moviesActions";
import MoviesDataInterface from "../interfaces/moviesDataInterface";

let defaultState: MoviesStateInterface = {
  movies: {
    data: new Array<MovieInterface>(),
    total: 0,
    offset: 0,
    limit: 0,
  },
  loadingMovie: true,
  loadingMovies: true,
  movie: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: defaultState,
  reducers: {
    fetchMovies(state, { payload }: PayloadAction<URLMovieParams>) {
      state.loadingMovies = true;
    },
    setMovies(state, { payload }: PayloadAction<MoviesDataInterface>) {
      state.loadingMovies = false;
      state.movies = payload;
    },
    fetchMovie(
      state,
      { payload }: PayloadAction<{ id: string; offset: number }>
    ) {
      state.loadingMovie = true;
    },
    setMovie(state, { payload }: PayloadAction<MovieInterface>) {
      state.movie = payload;
      state.loadingMovie = false;
    },
    resetMovies(state) {
      state.movies = {
        data: [],
        total: 0,
        offset: 0,
        limit: 9,
      };
      state.loadingMovies = true;
    },
    resetMovie(state) {
      state.movie = null;
      state.loadingMovie = true;
    },
    fetchMovieError(state) {
      state.movie = null;
      state.loadingMovie = false;
    },
    fetchMoviesError(state) {
      state.movies = {
        data: [],
        total: 0,
        offset: 0,
        limit: 9,
      };
      state.loadingMovies = false;
    },
  },
});

export const { reducer } = moviesSlice;
export const {
  fetchMovies,
  setMovies,
  fetchMovie,
  setMovie,
  resetMovies,
  resetMovie,
  fetchMovieError,
  fetchMoviesError,
} = moviesSlice.actions;
