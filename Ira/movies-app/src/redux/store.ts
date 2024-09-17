
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {moviesReducer, moviesAppState} from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga'; 


export interface rootState {
    movies: moviesAppState,
    movie: moviesAppState,
    loading: moviesAppState,
    hasMore: moviesAppState
}




const rootReducer = combineReducers ({
    movies: moviesReducer,
});

const composeEnhancers = composeWithDevTools({trace: true});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);



export default store;

