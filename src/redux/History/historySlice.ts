import {createSlice} from '@reduxjs/toolkit';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import {initialHistoryState} from "./initialHistoryState";

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
        exportHistoryToExcel: (state) => {
            console.log(state.historyArray);
            if (state.historyArray.length !== 0) {
                const worksheet = XLSX.utils.json_to_sheet(state.historyArray);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, 'historyData.xlsx');
            }
        },
    },
});

export const {addHistory, updateLatestHistory, exportHistoryToFile, exportHistoryToExcel} = historySlice.actions;
export default historySlice.reducer;