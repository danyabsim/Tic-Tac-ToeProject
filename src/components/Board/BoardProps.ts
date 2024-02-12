import {Dispatch, SetStateAction} from "react";
import {Player} from "../Player/Player";

export interface BoardProps {
    firstPlayer: Player;
    secondPlayer: Player;
    isFirstPlayerStars: boolean;
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>;
    XOArray: string[][];
    setXOArray: Dispatch<SetStateAction<string[][]>>;
    resetHandler: () => void;
    nextGameHandler: () => void;
    resetTheApp: () => void;
}
