import {combineReducers, configureStore} from '@reduxjs/toolkit';
import socketIOClient from 'socket.io-client';
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

const socket = socketIOClient('http://localhost:4000');

// Listen for state updates from the server
socket.on('state', (newState) => {
    store.dispatch({type: 'SET_STATE', payload: newState});
});

// Listen for actions from the server
store.subscribe(() => {
    const action = store.getState();
    if (action) {
        // Send the action to the server
        socket.emit('action', action);
    }
})

export default store;