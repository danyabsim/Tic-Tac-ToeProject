import { createSlice } from '@reduxjs/toolkit';
import {initialResultsState} from "./initialResultsState";

const resultsSlice = createSlice({
    name: 'results',
    initialState: initialResultsState,
    reducers: {
        firstPlayerWon: (state) => {
            state.firstPlayerWins = state.firstPlayerWins + 1;
        },
        addTie: (state) => {
            state.ties = state.ties + 1;
        },
        secondPlayerWon: (state) => {
            state.secondPlayerWins = state.secondPlayerWins + 1;
        },
        resetTheResults: (state) => {
            state.firstPlayerWins = 0;
            state.ties = 0;
            state.secondPlayerWins = 0;
        }
    },
});

export const { firstPlayerWon, addTie, secondPlayerWon, resetTheResults } = resultsSlice.actions;
export default resultsSlice.reducer;