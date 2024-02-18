import {ChangeEvent, Dispatch, FormEventHandler, SetStateAction} from "react";
import {Player} from "../../interfaces/Player";

export interface EnterFormProps {
    onEnter: FormEventHandler<HTMLFormElement>;
    currentPlayer: Player;
    roomCode: string;
    setRoomCode: Dispatch<SetStateAction<string>>;
    setCurrentPlayerName: Dispatch<SetStateAction<string>>;
    setCurrentPlayerSign: Dispatch<SetStateAction<string>>;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}