import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

// const initialState = { message: 'Welcome to WeExplore' };

export default createStore(allReducers, applyMiddleware(thunk));