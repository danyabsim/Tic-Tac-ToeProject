import {Dispatch, SetStateAction} from "react";

export interface GameProps {
    firstPlayerName: string; // Results
    secondPlayerName: string; // Results
    firstPlayerResults: number; // Results
    setFirstPlayerResults: Dispatch<SetStateAction<number>>; // Board & BottomButtons
    tieResults: number; // Results
    setTieResults: Dispatch<SetStateAction<number>>; // Board & BottomButtons
    secondPlayerResults: number; // Results
    setSecondPlayerResults: Dispatch<SetStateAction<number>>; // Board & BottomButtons
    isFirstPlayerStars: boolean; // BottomButtons
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>; // BottomButtons
    XOArray: string[][]; // Board
    setXOArray: Dispatch<SetStateAction<string[][]>>; // Board & BottomButtons
}