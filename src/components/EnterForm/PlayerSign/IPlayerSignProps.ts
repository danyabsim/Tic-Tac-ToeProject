import {Dispatch, SetStateAction} from "react";
import {IPlayer} from "../../../redux/Players/IPlayer";

export interface IPlayerSignProps
{
    currentPlayer: IPlayer;
    setCurrentPlayerSign: Dispatch<SetStateAction<string>>;
    handleFileChange: (acceptedFiles: File[]) => void;
    setFileCurrentPlayerURL: Dispatch<SetStateAction<string | null>>;
}