import { createSlice } from '@reduxjs/toolkit';

export interface historyArrayProps {
    firstPlayerName: string;
    secondPlayerName: string;
    firstPlayerWins: number;
    ties: number;
    secondPlayerWins: number;
}

export interface HistoryReducerState {
    historyArray: historyArrayProps[];
}

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

export const { addHistory, updateLatestHistory, removeAllHistory, consolePrint } = historySlice.actions;
export default historySlice.reducer;