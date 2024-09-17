import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import MoviePageHeader from './moviePageHeader';
import Layout from './layout'; 
import MoviesList from './moviesList';
import {IMovieCard} from './interfaces';
import {connect, ConnectedProps} from 'react-redux';
import {rootState} from '../redux/store';
import {clearMovies, requestMovie, fetchMovie, requestMovies, fetchMovies, 
        errorMovies, requestMoreMovies, setScroll} from '../redux/actions';
import Loader from "react-loader-spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
const queryString = require('query-string');




interface IMoviePageProps {
   movies: IMovieCard[];
   movie: IMovieCard | null;  
   loading: boolean; 
   dataLength: number;
   next(): Function;
   hasMore: boolean; 
   endMessage: {};    
}

type MoviePageProps = MoviePageConnectProps & RouteComponentProps<{id: string}> & IMoviePageProps;

class MoviePage extends React.Component<MoviePageProps> {
   
   componentDidMount() {
      console.log(this.props);
      const id = Number(this.props.match.params.id);
      this.props.requestMovie(id);              
   }
    
   componentWillUnmount() {
      this.props.clearMovies();
   }
   

   nextMovies() {
      let offset = this.props.movies.length;
      let genre;
      if(this.props.movie) {
       genre = this.props.movie.genres[0];         
      }
      this.props.requestMoreMovies(offset, "rating", genre, "genres");
   }


      render() {                     
      
         return (
           <div>
              <Layout>                
                  {!this.props.movie?  null:                          
                     <MoviePageHeader  movie = {this.props.movie} />
                  } 
                  <main>
                  {this.props.loading?
                    <div>
                        <Loader type="BallTriangle" color="#00BFFF" height={120} width={120}/><br></br>
                        <span> Loading...</span>
                    </div>:
                        <InfiniteScroll
                           dataLength={this.props.movies.length}                         
                           next={() => this.nextMovies()}  
                           hasMore={this.props.hasMore}                                                                 
                           endMessage={
                              <p style={{ textAlign: "center" }}>
                              <b>You have seen it all</b>
                              </p>
                           }
                        > 
                           <MoviesList movies={this.props.movies} loading={this.props.loading}></MoviesList> 
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
       movie: state.movies.movie,
       loading: state.movies.loading,
       hasMore: state.movies.hasMore   
   }
};

const mapDispatchToProps = {  
   requestMovie,
   fetchMovie,
   errorMovies,
   clearMovies, 
   requestMovies,
   fetchMovies,
   requestMoreMovies,
   setScroll
};





const connector = connect(mapStateToProps, mapDispatchToProps);
export type MoviePageConnectProps = ConnectedProps<typeof connector>;
export default connector(MoviePage);