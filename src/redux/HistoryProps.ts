import {Dispatch, SetStateAction} from "react";
import {HistoryReducerState} from "./HistoryReducer";

export interface HistoryProps {
    historyGameState: HistoryReducerState;
    setHistoryGameState: Dispatch<SetStateAction<HistoryReducerState>>;
}