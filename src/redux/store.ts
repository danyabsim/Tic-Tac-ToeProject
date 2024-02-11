import { configureStore, combineReducers } from '@reduxjs/toolkit';
import historyReducer from './historySlice';
import resultsReducer from "./resultsSlice";

const rootReducer = combineReducers({
    history: historyReducer,
    results: resultsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;