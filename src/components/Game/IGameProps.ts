import {IPlayer} from "../../interfaces/IPlayer";

export interface IGameProps {
    firstPlayer: IPlayer;
    secondPlayer: IPlayer;
    resetTheApp: () => void;
}