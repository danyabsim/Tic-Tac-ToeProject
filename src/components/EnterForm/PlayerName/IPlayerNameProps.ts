import {IPlayer} from "../../../redux/Players/IPlayer";
import {Dispatch, SetStateAction} from "react";

export interface IPlayerNameProps
{
    currentPlayer: IPlayer;
    setCurrentPlayerName: Dispatch<SetStateAction<string>>;
}