import {Dispatch, SetStateAction} from "react";

export interface BoardProps {
    firstPlayerResults: number;
    setFirstPlayerResults: Dispatch<SetStateAction<number>>;
    tieResults: number;
    setTieResults: Dispatch<SetStateAction<number>>;
    secondPlayerResults: number;
    setSecondPlayerResults: Dispatch<SetStateAction<number>>;
    isFirstPlayerStars: boolean;
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>;
    XOArray: string[][];
    setXOArray: Dispatch<SetStateAction<string[][]>>;
}
