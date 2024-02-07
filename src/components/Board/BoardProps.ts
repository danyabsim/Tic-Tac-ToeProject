import {Dispatch, SetStateAction} from "react";

export interface BoardProps {
    firstPlayerWins: number;
    setFirstPlayerWins: Dispatch<SetStateAction<number>>;
    ties: number;
    setTies: Dispatch<SetStateAction<number>>;
    secondPlayerWins: number;
    setSecondPlayerWins: Dispatch<SetStateAction<number>>;
    isFirstPlayerStars: boolean;
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>;
    XOArray: string[][];
    setXOArray: Dispatch<SetStateAction<string[][]>>;
    resetHandler: () => void;
    nextGameHandler: () => void;
    resetTheApp: () => void;
}
