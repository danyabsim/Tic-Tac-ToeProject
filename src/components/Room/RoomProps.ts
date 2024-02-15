import {Player} from "../../interfaces/Player";
import {Dispatch, SetStateAction} from "react";

export interface RoomProps {
    currentPlayer: Player;
    roomCode: string;
    setIsOnRoom: Dispatch<SetStateAction<boolean>>;
}