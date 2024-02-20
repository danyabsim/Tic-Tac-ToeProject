import {Dispatch, SetStateAction} from "react";
import {IPlayer} from "../../../redux/Players/IPlayer";

export interface IGameAlertProps {
    alertText: string;
    solvedChar: string;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    ResetHandler: () => void;
    NextGameHandler: () => void;
    ResetTheApp: () => void;
    firstPlayer: IPlayer;
    secondPlayer: IPlayer;
}