import { configureStore, combineReducers } from '@reduxjs/toolkit';
import historyReducer from './History/historySlice';
import resultsReducer from "./Results/resultsSlice";

const rootReducer = combineReducers({
    history: historyReducer,
    results: resultsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;