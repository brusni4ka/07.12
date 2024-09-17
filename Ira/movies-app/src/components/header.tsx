import React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import SearchForm from './searchForm';
import SortBlock from './sortBlock';
import {IMovieCard} from './interfaces';
import { SortBy } from './homePage';




 interface IHeaderProps extends RouteComponentProps {      
   sortBy: SortBy;     
   setSortBy(sortOption: string): void;   
   movies: IMovieCard[];   
  }

 const Header = (props: IHeaderProps) => {      
   console.log(props);
        const {sortBy, setSortBy, location, history, match, movies} = props;               
               
        return (
          <>
            <header className = {movies.length > 0 ? "header" :  "headerMarginBottom"}>                                 
                <Link className = "logoLink" to = "/">netflixroulette</Link>
                <SearchForm  location = {location} history = {history} sortBy = {sortBy}
                  match={match} />            
            </header>
            {
             movies.length > 0 ? 
            <div className="headerBottomBlock">
                <div className="moviesQuantityBlock">
                   <p className="moviesQuantity">{movies.length} movies found</p>
                </div>
               
                <SortBlock sortBy = {sortBy} setSortBy = {setSortBy} 
                           />                
                            
            </div>
            : null
            }
          </>
        );   
 }




export default Header;