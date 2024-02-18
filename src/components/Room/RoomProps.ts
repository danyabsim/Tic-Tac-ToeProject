import {Player} from "../../interfaces/Player";
import {Dispatch, SetStateAction} from "react";

export interface RoomProps {
    currentPlayer: Player;
    defaultPlayer: Player;
    roomCode: string;
    setIsOnRoom: Dispatch<SetStateAction<boolean>>;
    resetTheApp: () => void;
}