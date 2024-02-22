import {combineReducers, configureStore} from '@reduxjs/toolkit';
import historyReducer from './History/historySlice';
import resultsReducer from "./Results/resultsSlice";
import playersReducer from './Players/playersSlice';

const rootReducer = combineReducers({
    history: historyReducer,
    results: resultsReducer,
    players: playersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;