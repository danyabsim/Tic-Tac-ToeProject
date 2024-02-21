import {Dispatch, SetStateAction} from "react";

export interface IGameAlertProps {
    alertText: string;
    solvedChar: string;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    ResetHandler: () => void;
    NextGameHandler: () => void;
    ResetTheApp: () => void;
}