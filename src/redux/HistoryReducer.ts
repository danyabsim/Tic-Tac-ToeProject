import { ResultsProps } from "../components/Results/ResultsProps";

// Renamed the interface to avoid naming conflicts
export interface HistoryReducerState {
    historyArray: ResultsProps[];
}

// Renamed the initial state variable
export const initialHistoryState: HistoryReducerState = {
    historyArray: [],
};

// Used constants for action types
export const ActionTypes = {
    ADD_HISTORY: 'ADD_HISTORY',
    REMOVE_THE_OLDEST_HISTORY: 'REMOVE_THE_OLDEST_HISTORY',
    CONSOLE_PRINT: 'CONSOLE_PRINT',
};

// Renamed the function to avoid naming conflicts
export function HistoryReducer(state: HistoryReducerState, action: { type: string; history: ResultsProps }): HistoryReducerState {
    switch (action.type) {
        case ActionTypes.ADD_HISTORY:
            return { ...state, historyArray: [...state.historyArray, action.history] };
        case ActionTypes.REMOVE_THE_OLDEST_HISTORY:
            return { ...state, historyArray: state.historyArray.slice(1) };
        case ActionTypes.CONSOLE_PRINT:
            console.log(state.historyArray);
            return state;
        default:
            return state;
    }
}