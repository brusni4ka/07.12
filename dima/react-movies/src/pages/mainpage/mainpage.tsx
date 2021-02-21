import React, { useEffect, useState } from "react";
import ContentContainer from "../../components/contentContainer";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import MoviesContainer from "../../components/moviesContainer";
import ErrorBoundary from "../../components/errorBoundary";
import MoviesResult from "../../components/moviesResult";
import SortFilter from "../../components/sortFilter";
import Footer from "../../components/footer";
import QueryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import SortProperty from "../../enums/SortProperty";
import ParamsToPush from "../../interfaces/paramsToPush";

import "./mainpage.css";
import { useDispatch, useSelector } from "react-redux";
import { resetMovies, fetchMovies } from "../../redux/moviesReducer";
import { StateInterface } from "../../interfaces/stateInterface";
import MoviesDataInterface from "../../interfaces/moviesDataInterface";

const MainPage = () => {
  const [currentSortType, setCurrentSortType] = useState(SortProperty.date);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const movies = useSelector<StateInterface, MoviesDataInterface>(
    (state) => state.movies
  );

  const loading = useSelector<StateInterface, boolean>(
    (state) => state.loadingMovies
  );

  useEffect(() => {
    const compareSortFromUrlToState = (
      sortBy: string | string[] | null
    ): boolean => sortBy !== currentSortType;

    const fetchMoviesLocal = (pageNum: number): void => {
      let defaultParams = {
        limit: 9,
        sortBy: "release_date",
        sortOrder: "desc",
        offset: 0,
      };
      const oldParamsObj = QueryString.parse(location.search);
      const { sortBy } = oldParamsObj;
      if (sortBy && compareSortFromUrlToState(sortBy)) {
        setCurrentSortType(
          sortBy === SortProperty.date ? SortProperty.date : SortProperty.rating
        );
      }

      dispatch(
        fetchMovies({
          ...defaultParams,
          ...oldParamsObj,
          sortBy: oldParamsObj.sortBy ? oldParamsObj.sortBy : currentSortType,
          offset: pageNum * 9,
        })
      );
    };
    fetchMoviesLocal(getPage());
    return () => {
      dispatch(resetMovies());
    };
    // eslint-disable-next-line
  }, [location.search]);

  const pushParams = (urlParams: ParamsToPush): void => {
    history.push({
      pathname: "/search",
      search: QueryString.stringify({ ...urlParams, page: 1 }),
    });
  };

  const switchCurrentSortType = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const oldParam = QueryString.parse(location.search);
    const { value } = e.currentTarget;
    if (
      !oldParam.sortBy ||
      (oldParam.sortBy !== value && currentSortType !== value)
    ) {
      const newParamString = QueryString.stringify({
        ...oldParam,
        sortBy: value,
      });
      history.push({
        pathname: location.pathname,
        search: newParamString,
      });
      setCurrentSortType(
        value === SortProperty.date ? SortProperty.date : SortProperty.rating
      );
    }
  };
  const getPage = (): number => {
    const params = QueryString.parse(location.search);
    const numPage =
      params.page && Number(params.page.toString()) - 1 >= 0
        ? Number(params.page.toString()) - 1
        : 0;
    return numPage;
  };

  const onPageChanged = (selected: number): void => {
    const params = QueryString.parse(location.search);
    history.push({
      pathname: location.pathname,
      search: QueryString.stringify({ ...params, page: selected + 1 }),
    });
  };

  return (
    <div className="app">
      <div className="first-screen-wrapper">
        <ContentContainer>
          <Header />
          <ErrorBoundary>
            <SearchBar pushParamsOnSubmit={pushParams} />
          </ErrorBoundary>
        </ContentContainer>
      </div>
      <div className="second-screen-wrapper">
        <ContentContainer>
          <div className="flex-wrapper">
            {movies.data?.length !== 0 && (
              <>
                <ErrorBoundary>
                  <MoviesResult total={movies.total} loading={loading} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <SortFilter
                    currentSortType={currentSortType}
                    switchCurrentSortType={switchCurrentSortType}
                  />
                </ErrorBoundary>
              </>
            )}
          </div>
        </ContentContainer>
      </div>
      <div className="third-screen-wrapper">
        <ContentContainer>
          <ErrorBoundary>
            <MoviesContainer
              movies={movies.data}
              total={movies.total}
              page={getPage()}
              loading={loading}
              onPageChanged={onPageChanged}
            />
          </ErrorBoundary>
        </ContentContainer>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
