import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {SortBy} from './homePage';
const queryString = require('query-string');


export enum SearchBy {
    Title = "title",
    Genre = "genre"
 }
 
interface ISearchFormState {  
    searchValue: string;
    searchBy: SearchBy;    
}

interface ISearchFormProps extends RouteComponentProps {      
    sortBy: SortBy;   
}

class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {
    state = {        
        searchValue: "",
        searchBy: SearchBy.Title        
    }
   
    componentDidMount() {    
        const { searchBy, searchValue } = queryString.parse(this.props.location.search);
        this.setState({ searchBy: searchBy || SearchBy.Title, searchValue:  searchValue || ""});
    }

    componentDidUpdate(prevProps: RouteComponentProps) {
        if (this.props.location.search !== prevProps.location.search) {
           const {searchBy, searchValue} = queryString.parse(this.props.location.search);
           this.setState({ searchBy: searchBy || SearchBy.Title, searchValue:  searchValue || ""});
        }
    }   
    
    changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: e.target.value });
    }
      
    setSearchByTitle = () => {
        this.setState({ searchBy: SearchBy.Title, searchValue: "" });
    }
      
    setSearchByGenre = () => {
        this.setState({ searchBy: SearchBy.Genre, searchValue: "" });
    }
      
    submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 
        
      const locationSearch = queryString.parse(this.props.location.search);            
      locationSearch.searchBy = this.state.searchBy;
      locationSearch.searchValue = this.state.searchValue;
      const locationSearchString = queryString.stringify(locationSearch);   
      this.props.history.push(`/search?${locationSearchString}`);
    }
    
  
    render() {
        const { searchValue, searchBy } = this.state;
        return (
            <div>
                <form className ="searchForm" name = "searchForm" method = "get"  onSubmit = {this.submitSearch}> 
                    <p className = "searchFormCaption">find your movie</p>                      
                    <input className = "searchFormInput" type = "text" id = "searchInput" name = "searchValue"
                       value = {searchValue} onChange = {this.changeSearchValue}/>
                    <div className = "searchFormControls">
                        <div className = "filterBlock">
                            <p className = "filterBlockCaption">search by</p>
                            <button type = "button" className = {
                                                  searchBy === SearchBy.Title? "filterBlockButtonActive" : "filterBlockButtonNotActive"}                                                  
                                              onClick = {this.setSearchByTitle}>title</button>
                            <button type = "button" className = {
                                                  searchBy === SearchBy.Genre? "filterBlockButtonActive" : "filterBlockButtonNotActive"}
                                              onClick = {this.setSearchByGenre}>genre</button>
                        </div>
                        <button type="submit" className = "searchButton">search</button>     
                    </div>                   
                </form>
            </div>
        );
    }

}


export default SearchForm;