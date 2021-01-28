import React from "react";
import ContentContainer from "../../components/contentContainer";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import MoviesContainer from "../../components/moviesContainer";
import ErrorBoundary from "../../components/errorBoundary";
import MovieInterface from "../../interfaces/movieInterface";
import MoviesResult from "../../components/moviesResult";
import SortFilter from "../../components/sortFilter";
import Footer from "../../components/footer";

import * as QueryString from "query-string";
import { RouteComponentProps } from "react-router-dom";

import "./mainpage.css";

interface MainPageProps {
  route: RouteComponentProps;
  movies: MovieInterface[];
  currentSortType: string;
  isMoviesExisted: boolean;
  setCurrentSortType: (currentSortType: string) => void;
  searchMovies: (value: string, category: string) => void;
  setIsMoviesExisted: (isMoviesExisted: boolean) => void;
  setMovies: (movies: MovieInterface[]) => void;
}

class MainPage extends React.Component<MainPageProps> {
  componentDidMount() {
    this.fetchMovies();
  }
  componentDidUpdate(prevProps: MainPageProps) {
    if (prevProps.route.location.search !== this.props.route.location.search) {
      this.fetchMovies();
    }
  }
  fetchMovies = (): void => {
    const {
      route,
      currentSortType,
      setIsMoviesExisted,
      setMovies,
    } = this.props;
    if (route.location.pathname === "/") {
      fetch(
        `https://reactjs-cdp.herokuapp.com/movies?limit=9&sortBy=release_date&sortOrder=desc`
      )
        .then((response) => response.json())
        .then((movies) => {
          if (Object.keys(movies).length > 0) {
            setMovies(movies.data);
            setIsMoviesExisted(true);
          } else {
            setIsMoviesExisted(false);
            setMovies([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (route.location.pathname === "/search") {
      const { search } = route.location;
      const oldParamsObj = QueryString.parse(search);
      let url = "https://reactjs-cdp.herokuapp.com/movies?";
      if (!oldParamsObj.sortBy) {
        url = url.concat(
          QueryString.stringify({
            ...oldParamsObj,
            sortBy: currentSortType,
            limit: 9,
            sortOrder: "desc",
          })
        );
      } else {
        url = url.concat(
          QueryString.stringify({
            ...oldParamsObj,
            limit: 9,
            sortOrder: "desc",
          })
        );
      }
      fetch(url)
        .then((response) => response.json())
        .then((movies) => {
          if (Object.keys(movies.data).length > 0) {
            setMovies(movies.data);
            setIsMoviesExisted(true);
          } else {
            setMovies([]);
            setIsMoviesExisted(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  switchCurrentSortType = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const { route, currentSortType } = this.props;
    const oldParam = QueryString.parse(route.location.search);
    const { value } = e.currentTarget;
    if (
      !oldParam.sortBy ||
      (oldParam.sortBy !== value && currentSortType !== value)
    ) {
      const newParamString = QueryString.stringify({
        ...oldParam,
        sortBy: value,
      });

      route.history.push({
        pathname: this.props.route.location.pathname,
        search: newParamString,
      });
      this.props.setCurrentSortType(value);
    }
  };

  renderPanel = (): React.ReactNode => {
    const { movies, currentSortType, isMoviesExisted } = this.props;
    return (
      <>
        <ErrorBoundary>
          <MoviesResult movies={movies} isMoviesExisted={isMoviesExisted} />
        </ErrorBoundary>
        <ErrorBoundary>
          <SortFilter
            currentSortType={currentSortType}
            switchCurrentSortType={this.switchCurrentSortType}
          />
        </ErrorBoundary>
      </>
    );
  };

  render() {
    const {
      movies,
      currentSortType,
      searchMovies,
      route,
      isMoviesExisted,
    } = this.props;
    return (
      <div className="app">
        <div className="first-screen-wrapper">
          <ContentContainer>
            <Header showSearchBtn={false} />
            <ErrorBoundary>
              <SearchBar
                searchMovies={searchMovies}
                route={route}
                fetchMovies={this.fetchMovies}
                currentSortType={currentSortType}
              />
            </ErrorBoundary>
          </ContentContainer>
        </div>
        <div className="second-screen-wrapper">
          <ContentContainer>
            <div className="flex-wrapper">
              {movies?.length !== 0 && this.renderPanel()}
            </div>
          </ContentContainer>
        </div>
        <div className="third-screen-wrapper">
          <ContentContainer>
            <ErrorBoundary>
              <MoviesContainer
                movies={movies}
                isMoviesExisted={isMoviesExisted}
              />
            </ErrorBoundary>
          </ContentContainer>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainPage;
