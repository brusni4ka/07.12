
import {all} from 'redux-saga/effects';
import {moviesSagas} from './moviesSagas'; 


export default function* rootSaga() {
    yield all([
        moviesSagas()
    ])    
}