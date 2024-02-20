import {createSlice} from '@reduxjs/toolkit';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import {initialHistoryState} from "./initialHistoryState";

const historySlice = createSlice({
    name: 'history',
    initialState: initialHistoryState,
    reducers: {
        addHistory: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        updateLatestHistory: (state, action) => {
            state.data[state.data.length - 1] = action.payload;
        },
        exportHistoryToFile: (state) => {
            // Convert the data to a JSON string
            const jsonData = JSON.stringify(state.data, null, 2);
            // Convert the JSON string to a Blob
            const blob = new Blob([jsonData], {type: 'application/json;charset=utf-8'});
            // Use FileSaver to save the Blob as a file
            saveAs(blob, 'historyData.json');
        },
        exportHistoryToExcel: (state) => {
            const worksheet = XLSX.utils.json_to_sheet(state.data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            XLSX.writeFile(workbook, 'historyData.xlsx');
        },
    },
});

export const {addHistory, updateLatestHistory, exportHistoryToFile, exportHistoryToExcel} = historySlice.actions;
export default historySlice.reducer;