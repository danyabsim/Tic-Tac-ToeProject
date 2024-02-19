import {Dispatch, SetStateAction} from "react";
import {IPlayer} from "../../../interfaces/IPlayer";

export interface IGameAlertProps {
    alertText: string;
    solvedChar: string;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    resetHandler: () => void;
    nextGameHandler: () => void;
    resetTheApp: () => void;
    firstPlayer: IPlayer;
    secondPlayer: IPlayer;
}