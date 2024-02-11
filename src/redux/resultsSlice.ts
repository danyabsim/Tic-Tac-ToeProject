import { createSlice } from '@reduxjs/toolkit';
import { ResultsProps } from "../components/Results/ResultsProps";

export interface ResultsReducerState {
    firstPlayerWins: number;
    ties: number;
    secondPlayerWins: number;
}

export const initialResultsState: ResultsReducerState = {
    firstPlayerWins: 0,
    ties: 0,
    secondPlayerWins: 0,
};

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