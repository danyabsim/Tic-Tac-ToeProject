import {Dispatch, SetStateAction} from "react";

export interface IBoardProps {
    isFirstPlayerStars: boolean;
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>;
    XOArray: string[][];
    setXOArray: Dispatch<SetStateAction<string[][]>>;
    ResetHandler: () => void;
    NextGameHandler: () => void;
    ResetTheApp: () => void;
}
