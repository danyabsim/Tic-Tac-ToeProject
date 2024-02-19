import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {IPlayer} from "../../../interfaces/IPlayer";

export interface IPlayerSignProps
{
    currentPlayer: IPlayer;
    setCurrentPlayerSign: Dispatch<SetStateAction<string>>;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}