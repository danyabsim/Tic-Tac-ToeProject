import {IPlayer} from "../../../interfaces/IPlayer";
import {Dispatch, SetStateAction} from "react";

export interface IPlayerNameProps
{
    currentPlayer: IPlayer;
    setCurrentPlayerName: Dispatch<SetStateAction<string>>;
}