import {IPlayer} from "../../interfaces/IPlayer";
import {Dispatch, SetStateAction} from "react";

export interface IRoomProps {
    currentPlayer: IPlayer;
    defaultPlayer: IPlayer;
    roomCode: string;
    setIsOnRoom: Dispatch<SetStateAction<boolean>>;
    resetTheApp: () => void;
}