import {Player} from "../../interfaces/Player";

export interface GameProps {
    firstPlayer: Player;
    secondPlayer: Player;
    resetTheApp: () => void;
}