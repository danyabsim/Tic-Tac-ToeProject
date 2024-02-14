import {Dispatch, SetStateAction} from "react";
import {Player} from "../../interfaces/Player";

export interface GameAlertProps {
    alertText: string;
    solvedChar: string;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    resetHandler: () => void;
    nextGameHandler: () => void;
    resetTheApp: () => void;
    firstPlayer: Player;
    secondPlayer: Player;
}