import {Dispatch, SetStateAction} from "react";

export interface IEnterFormProps {
    OnEnter: () => void;
    roomCode: string;
    setRoomCode: Dispatch<SetStateAction<string>>;
}