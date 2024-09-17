import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import Header from './header';
import Layout from './layout';
import MoviesList from './moviesList';
import {connect, ConnectedProps} from 'react-redux';
import {rootState} from '../redux/store';
import {requestMovies, fetchMovies, requestMoreMovies, errorMovies, clearMovies, setScroll} from '../redux/actions';
import Loader from "react-loader-spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
const queryString = require('query-string');
/*import {parse, stringify} from 'stringquery';*/


export enum SortBy {
   Rating = "rating",
   Release = "release_date"
}

interface IHomePageState {     
   sortBy: SortBy;
}

export interface IHomePageProps {
   dataLength: number;
   next(): Function;
   hasMore: boolean; 
   endMessage: {};    
}

type HomePageProps = HomePageConnectProps & RouteComponentProps & IHomePageProps;

class HomePage extends React.Component<HomePageProps, IHomePageState> {

   state = {          
      sortBy: SortBy.Rating
   }

   componentDidMount() {      
      const { sortBy, searchValue, searchBy } = queryString.parse(this.props.location.search);
      this.setState({sortBy: sortBy || SortBy.Rating});
      this.props.requestMovies( sortBy, searchValue, searchBy);             
   } 
   

   componentDidUpdate(prevProps: RouteComponentProps) {
      if (this.props.location.search !== prevProps.location.search) {
         const {sortBy, searchValue, searchBy} = queryString.parse(this.props.location.search);
         this.setState({ sortBy: sortBy || SortBy.Rating});
         this.props.requestMovies(sortBy, searchValue, searchBy);      
      }
   }
   
   componentWillUnmount() {
      this.props.clearMovies();
   }
   
   setSortBy = (sortOption: SortBy) => {
      this.setState({ sortBy: sortOption });
      const locationSearch = queryString.parse(this.props.location.search);
      locationSearch.sortBy = sortOption;
      const locationSearchString = queryString.stringify(locationSearch);    
      this.props.history.push(`/search?${locationSearchString}`);  
   }   
   
 
   render() {            
      const { sortBy, searchValue, searchBy } = queryString.parse(this.props.location.search);
      let offset = this.props.movies.length;      
      
      return (
         <div>
            <Layout>
               <Header sortBy={this.state.sortBy}
                  setSortBy={this.setSortBy}                                
                  movies={this.props.movies} location={this.props.location} history={this.props.history}
                  match={this.props.match} />
               <main>
                 {this.props.loading? 
                    <div>
                        <Loader type="BallTriangle" color="#00BFFF" height={120} width={120}/><br></br>
                        <span> Loading...</span>
                    </div> :
                    <InfiniteScroll
                        dataLength={this.props.movies.length}                         
                        next={() => this.props.requestMoreMovies(offset, sortBy, searchValue, searchBy)}  
                        hasMore={this.props.hasMore}                                                                 
                        endMessage={
                          <p style={{ textAlign: "center" }}>
                          <b>You have seen it all</b>
                         </p>
                        }
                     > 
                        <MoviesList movies={this.props.movies} loading={this.props.loading}/>                                              
                    </InfiniteScroll> 
                  }   
               </main>
            </Layout>
         </div>
      );
   }

}

const mapStateToProps = (state: rootState) => {   
   return {
       movies: state.movies.movies,
       loading: state.movies.loading,     
       hasMore: state.movies.hasMore
   }
};

const mapDispatchToProps = {
   requestMovies,
   fetchMovies, 
   requestMoreMovies,    
   errorMovies,
   clearMovies,
   setScroll   
};



const connector = connect(mapStateToProps, mapDispatchToProps);
export type HomePageConnectProps = ConnectedProps<typeof connector>;
export default connector(HomePage);
