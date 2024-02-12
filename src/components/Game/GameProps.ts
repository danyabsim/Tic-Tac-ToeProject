import {Player} from "../Player/Player";

export interface GameProps {
    firstPlayer: Player;
    secondPlayer: Player;
    resetTheApp: () => void;
}