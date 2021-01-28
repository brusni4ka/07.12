import React from "react";
import "./SortPanel.css";
import { Location } from "history";
import { parse } from "querystring";

interface ISortPanelProps {
  movieCount: number;
  handleSort(sortBy: string): void;
  location: Location;
}

interface ISortPanelState {
  sortBy: string;
}

enum SortBy {
  Rating = "vote_average",
  ReleaseDate = "release_date",
}

class SortPanel extends React.Component<ISortPanelProps, ISortPanelState> {
  state: ISortPanelState = {
    sortBy: SortBy.Rating,
  };

  componentDidMount() {
    const searchParams = this.props.location.search.slice(1);
    const parsed = parse(searchParams) as {
      sortBy: string;
    };

    if (parsed.sortBy) {
      if (parsed.sortBy == "vote_average") {
        this.setState({ sortBy: SortBy.Rating });
      } else {
        this.setState({ sortBy: SortBy.ReleaseDate });
      }
    } 


  }

  handleSearchByBtn = (btnType: SortBy) => {
    this.setState({
      sortBy: btnType,
    });
    this.props.handleSort(btnType);
  };

  render() {
    return (
      <div
        className={
          this.props.movieCount == 0
            ? "sort-panel-hidden"
            : "sort-panel-wrapper"
        }
      >
        <div className="movie-count">
          <span>{this.props.movieCount} movies found</span>
        </div>
        <div className="sort-by">
          <span>Sort by</span>
          <button
            onClick={() => this.handleSearchByBtn(SortBy.ReleaseDate)}
            className={
              this.state.sortBy === SortBy.ReleaseDate
                ? "sort-by-btn-active"
                : "sort-by-btn"
            }
          >
            release date
          </button>
          <button
            onClick={() => this.handleSearchByBtn(SortBy.Rating)}
            className={
              this.state.sortBy === SortBy.Rating
                ? "sort-by-btn-active"
                : "sort-by-btn"
            }
          >
            rating
          </button>
        </div>
      </div>
    );
  }
}

export default SortPanel;
