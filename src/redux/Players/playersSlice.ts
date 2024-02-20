import {createSlice} from "@reduxjs/toolkit";
import {InitialPlayersState} from "./initialPlayersState";

const playersSlice = createSlice({
    name: 'players',
    initialState: InitialPlayersState,
    reducers: {
        addNewPlayer: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        removeLastPlayer: (state) => {
            state.data = state.data.slice(0, -1);
        },
    },
});

export const {addNewPlayer, removeLastPlayer} = playersSlice.actions;
export default playersSlice.reducer;