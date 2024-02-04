import {Dispatch, SetStateAction} from "react";

export interface BottomButtonsProps {
    setFirstPlayerResults: Dispatch<SetStateAction<number>>;
    setTieResults: Dispatch<SetStateAction<number>>;
    setSecondPlayerResults: Dispatch<SetStateAction<number>>;
    isFirstPlayerStars: boolean;
    setIsFirstPlayerStars: Dispatch<SetStateAction<boolean>>;
    setXOArray: Dispatch<SetStateAction<string[][]>>;
}