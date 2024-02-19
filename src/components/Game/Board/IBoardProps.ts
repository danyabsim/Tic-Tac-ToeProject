import {Dispatch, SetStateAction} from "react";
import {IPlayer} from "../../../interfaces/IPlayer";

export interface IBoardProps {
    firstPlayer: IPlayer;
    secondPlayer: IPlayer;
    isFirstPlayerStars: boolean;
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>;
    XOArray: string[][];
    setXOArray: Dispatch<SetStateAction<string[][]>>;
    ResetHandler: () => void;
    NextGameHandler: () => void;
    ResetTheApp: () => void;
}
