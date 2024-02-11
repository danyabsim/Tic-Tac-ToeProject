import {Dispatch, SetStateAction} from "react";

export interface BoardProps {
    firstPlayerName: string;
    secondPlayerName: string;
    firstPlayerSign: string;
    secondPlayerSign: string;
    isFirstPlayerStars: boolean;
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>;
    XOArray: string[][];
    setXOArray: Dispatch<SetStateAction<string[][]>>;
    fileFirstPlayerURL: string | null;
    fileSecondPlayerURL: string | null;
    resetHandler: () => void;
    nextGameHandler: () => void;
    resetTheApp: () => void;
}
