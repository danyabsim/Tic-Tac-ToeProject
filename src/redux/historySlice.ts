import { createSlice } from '@reduxjs/toolkit';
import { ResultsProps } from "../components/Results/ResultsProps";

// Renamed the interface to avoid naming conflicts
export interface HistoryReducerState {
    historyArray: ResultsProps[];
}

// Renamed the initial state variable
export const initialHistoryState: HistoryReducerState = {
    historyArray: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState: initialHistoryState,
    reducers: {
        addHistory: (state, action) => {
            state.historyArray = [...state.historyArray, action.payload];
        },
        removeTheOldestHistory: (state) => {
            state.historyArray = state.historyArray.slice(1);
        },
        updateLatestHistory: (state, action) => {
            const lastIndex = state.historyArray.length - 1;
            if (lastIndex >= 0) {
                state.historyArray[lastIndex] = action.payload;
            }
        },
        removeAllHistory: (state) => {
            state.historyArray = [];
        },
        consolePrint: (state) => {
            console.log(state.historyArray);
        },
    },
});

export const { addHistory, removeTheOldestHistory, updateLatestHistory, removeAllHistory, consolePrint } = historySlice.actions;
export default historySlice.reducer;