import ActionTypes from "../enums/ActionTypes";
import { takeLatest, put, call, all } from "redux-saga/effects";
import { FetchMovieAction } from "./moviesActions";
import { fetchMovies, setMovie, fetchMovieError } from "./moviesReducer";
import MovieInterface from "../interfaces/movieInterface";

const fetchMovie = async (id: string): Promise<MovieInterface> => {
  const response = await fetch(
    `https://reactjs-cdp.herokuapp.com/movies/${id}`
  );
  const movie = await response.json();
  return movie;
};

function* fetchMovieSaga(action: FetchMovieAction) {
  try {
    const { id } = action.payload;
    const movie = yield call(fetchMovie, id);
    yield put(setMovie(movie));
    const { offset } = action.payload;
    yield put(fetchMovies({ filter: movie.genres[0], limit: 9, offset }));
  } catch (e) {
    yield put(fetchMovieError());
  }
}

const fetchMovieSub = () => {
  return takeLatest(ActionTypes.FETCH_MOVIE, fetchMovieSaga);
};

export default (function* () {
  return yield all([fetchMovieSub()]);
})();
