import React, { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import ContentContainer from "../../components/contentContainer";
import CurrentMovieGenreFilter from "../../components/currentMovieGenreFilter";
import ErrorBoundary from "../../components/errorBoundary";
import Footer from "../../components/footer";
import Header from "../../components/header";
import MoviePresent from "../../components/moviePresent/moviePresent";
import MoviesContainer from "../../components/moviesContainer";
import QueryString from "query-string";

import "./moviepage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie, resetMovie } from "../../redux/moviesReducer";
import { StateInterface } from "../../interfaces/stateInterface";
import MovieInterface from "../../interfaces/movieInterface";
import MoviesDataInterface from "../../interfaces/moviesDataInterface";

const MoviePage = () => {
  let location = useLocation();
  let params = useParams<{ id: string }>();
  let history = useHistory();
  const dispatch = useDispatch();
  const movie = useSelector<StateInterface, MovieInterface | null>(
    (state) => state.movie
  );
  const movies = useSelector<StateInterface, MoviesDataInterface>(
    (state) => state.movies
  );
  const loadingMovies = useSelector<StateInterface, boolean>(
    (state) => state.loadingMovies
  );
  const loadingMovie = useSelector<StateInterface, boolean>(
    (state) => state.loadingMovie
  );

  useEffect(() => {
    dispatch(fetchMovie({ id: params.id, offset: getPage() * 9 }));
    return () => {
      dispatch(resetMovie());
    };
    // eslint-disable-next-line
  }, [location.search, params.id]);

  const getPage = (): number => {
    const urlParams = QueryString.parse(location.search);
    const numPage =
      urlParams.page && Number(urlParams.page.toString()) - 1 >= 0
        ? Number(urlParams.page.toString()) - 1
        : 0;
    return numPage;
  };

  const onPageChanged = (selected: number): void => {
    const urlParams = QueryString.parse(location.search);
    history.push({
      pathname: location.pathname,
      search: QueryString.stringify({ ...urlParams, page: selected + 1 }),
    });
  };

  return (
    <div className="app">
      <div className="first-screen-wrapper">
        <ContentContainer>
          <Header showSearchBtn />
          <ErrorBoundary>
            <MoviePresent movie={movie} loading={loadingMovie} />
          </ErrorBoundary>
        </ContentContainer>
      </div>
      {movie?.genres && (
        <div className="second-screen-wrapper">
          <ContentContainer>
            <CurrentMovieGenreFilter genre={movie.genres[0]} />
          </ContentContainer>
        </div>
      )}
      {movie && (
        <div className="third-screen-wrapper">
          <ContentContainer>
            <MoviesContainer
              movies={movies.data}
              total={movies.total}
              page={getPage()}
              loading={loadingMovies}
              onPageChanged={onPageChanged}
            />
          </ContentContainer>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MoviePage;
