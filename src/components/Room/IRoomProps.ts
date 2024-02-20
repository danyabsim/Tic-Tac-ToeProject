import {Dispatch, SetStateAction} from "react";

export interface IRoomProps {
    roomCode: string;
    setIsOnRoom: Dispatch<SetStateAction<boolean>>;
    ResetTheApp: () => void;
}