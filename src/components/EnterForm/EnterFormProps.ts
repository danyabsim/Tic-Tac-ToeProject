import {ChangeEvent, Dispatch, FormEventHandler, SetStateAction} from "react";
import {Player} from "../../interfaces/Player";

export interface EnterFormProps {
    onEnter: FormEventHandler<HTMLFormElement>;
    firstPlayer: Player;
    secondPlayer: Player;
    setFirstPlayerName: Dispatch<SetStateAction<string>>;
    setSecondPlayerName: Dispatch<SetStateAction<string>>;
    setFirstPlayerSign: Dispatch<SetStateAction<string>>;
    setSecondPlayerSign: Dispatch<SetStateAction<string>>;
    handleFileChange: (event: ChangeEvent<HTMLInputElement>, where: string) => void;
}