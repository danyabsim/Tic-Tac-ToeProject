import {Dispatch, SetStateAction} from "react";

export interface IRoomCodeProps
{
    roomCode: string;
    setRoomCode: Dispatch<SetStateAction<string>>;
}