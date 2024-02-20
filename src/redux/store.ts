import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage
//
// // Configure persisting the state to localStorage
// const persistConfig = {
//     key: 'root',
//     storage,
// };
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// // Create the Redux store
// const store = configureStore({
//     reducer: persistedReducer,
// });
//
// const persistor = persistStore(store);
//
// export { store, persistor };