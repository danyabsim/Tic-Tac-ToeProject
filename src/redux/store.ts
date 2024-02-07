import { configureStore, combineReducers } from '@reduxjs/toolkit';
import historyReducer from './historySlice';

// Import other reducers if needed
// import anotherReducer from './anotherSlice';

const rootReducer = combineReducers({
    history: historyReducer,
    // Add other reducers here
    // another: anotherReducer,
});

// Assuming you have a RootState type for useSelector in components
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
});

export default store;