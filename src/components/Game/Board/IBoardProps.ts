import {Dispatch, SetStateAction} from "react";
import {IPlayer} from "../../../interfaces/IPlayer";

export interface IBoardProps {
    firstPlayer: IPlayer;
    secondPlayer: IPlayer;
    isFirstPlayerStars: boolean;
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>;
    XOArray: string[][];
    setXOArray: Dispatch<SetStateAction<string[][]>>;
    resetHandler: () => void;
    nextGameHandler: () => void;
    resetTheApp: () => void;
}
