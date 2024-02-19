import {ChangeEvent, Dispatch, FormEventHandler, SetStateAction} from "react";
import {IPlayer} from "../../interfaces/IPlayer";

export interface IEnterFormProps {
    OnEnter: FormEventHandler<HTMLFormElement>;
    currentPlayer: IPlayer;
    roomCode: string;
    setRoomCode: Dispatch<SetStateAction<string>>;
    setCurrentPlayerName: Dispatch<SetStateAction<string>>;
    setCurrentPlayerSign: Dispatch<SetStateAction<string>>;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setFileCurrentPlayerURL: Dispatch<SetStateAction<string | null>>;
}