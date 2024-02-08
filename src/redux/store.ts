import { configureStore, combineReducers } from '@reduxjs/toolkit';
import historyReducer from './historySlice';

const rootReducer = combineReducers({
    history: historyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;