import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {IPlayer} from "../../../redux/Players/IPlayer";

export interface IPlayerSignProps
{
    currentPlayer: IPlayer;
    setCurrentPlayerSign: Dispatch<SetStateAction<string>>;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setFileCurrentPlayerURL: Dispatch<SetStateAction<string | null>>;
}