
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from './components/homePage';
import MoviePage from './components/moviePage';
import ErrorPage from './components/404';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  return ( 
    <Provider store = {store}>   
    <Router>
        <Switch>
            <Route exact path = "/" component = {HomePage}/>
            <Route path = "/search" component = {HomePage} />            
            <Route path = "/movie/:id" component = {MoviePage}/> 
            <Route path = "/" render = {() => <ErrorPage/> }  />                  
       </Switch>
   </Router>
   </Provider>
 );
}

export default App;
