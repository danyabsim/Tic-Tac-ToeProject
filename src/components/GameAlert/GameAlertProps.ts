import {Dispatch, SetStateAction} from "react";

export interface GameAlertProps {
    alertText: string;
    solvedChar: string;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    resetHandler: () => void;
    nextGameHandler: () => void;
    resetTheApp: () => void;
}