import React, { useEffect, useState } from "react";
import SearchFilter from "./searchFilter";
import "./searchBar.css";
import ErrorBoundary from "../errorBoundary";
import * as QueryString from "query-string";
import FilterProperty from "../../enums/FilterPropery";
import { useLocation } from "react-router";
import ParamsToPush from "../../interfaces/paramsToPush";
interface SearchBarProps {
  pushParamsOnSubmit: (urlParams: ParamsToPush) => void;
}

const SearchBar = ({ pushParamsOnSubmit }: SearchBarProps) => {
  const location = useLocation();
  const [searchBarValue, setSearchBarValue] = useState("");
  const [searchBy, setSearchBy] = useState(FilterProperty.title);

  useEffect(() => {
    const setFiltersFromURL = (): void => {
      const { search, searchBy: category } = QueryString.parse(location.search);
      setSearchBarValue(search ? search.toString() : "");
      setSearchBy(
        !category || category === FilterProperty.title
          ? FilterProperty.title
          : FilterProperty.genre
      );
    };
    setFiltersFromURL();
  }, [location.search]);

  const onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: searchBarValue } = e.target;
    setSearchBarValue(searchBarValue);
  };

  const toggleSearchCategoryByClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (e) {
      const { value } = e.currentTarget;
      setSearchBy(
        value.toLowerCase() === FilterProperty.genre
          ? FilterProperty.genre
          : FilterProperty.title
      );
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const urlParams: ParamsToPush = {
      search: searchBarValue,
      searchBy,
    };
    pushParamsOnSubmit(urlParams);
  };

  return (
    <form onSubmit={onFormSubmit} className="search-bar">
      <h2 className="search-bar_heading">Find your movie</h2>
      <input
        className="search-bar_input"
        type="text"
        value={searchBarValue}
        onChange={onSearchBarChange}
        placeholder="Type your movie"
      />
      <div className="search-bar_wrapper">
        <ErrorBoundary>
          <SearchFilter
            searchedBy={searchBy}
            toggleSearchCategory={toggleSearchCategoryByClick}
          />
        </ErrorBoundary>

        <button type="submit" className="btn search-bar_search-btn">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
