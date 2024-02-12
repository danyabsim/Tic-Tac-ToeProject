import {createSlice} from '@reduxjs/toolkit';
import {saveAs} from 'file-saver';

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
        consolePrint: (state) => {
            console.log(state.historyArray);
        },
        exportHistoryToFile: (state) => {
            if (state.historyArray.length !== 0) {
                // Convert the historyArray to a JSON string
                const jsonData = JSON.stringify(state.historyArray, null, 2);

                // Convert the JSON string to a Blob
                const blob = new Blob([jsonData], {type: 'application/json;charset=utf-8'});

                // Use FileSaver to save the Blob as a file
                saveAs(blob, 'historyData.json');
            }
        },
    },
});

export const {addHistory, updateLatestHistory, consolePrint, exportHistoryToFile} = historySlice.actions;
export default historySlice.reducer;