import {Dispatch, FormEventHandler, SetStateAction} from "react";

export interface EnterFormProps {
    onEnter: FormEventHandler<HTMLFormElement>;
    firstPlayerName: string;
    secondPlayerName: string;
    setFirstPlayerName: Dispatch<SetStateAction<string>>;
    setSecondPlayerName: Dispatch<SetStateAction<string>>;
    firstPlayerSign: string;
    secondPlayerSign: string;
    setFirstPlayerSign: Dispatch<SetStateAction<string>>;
    setSecondPlayerSign: Dispatch<SetStateAction<string>>;
    setSelectedFirstPlayerFile: Dispatch<SetStateAction<File | null>>
    setSelectedSecondPlayerFile: Dispatch<SetStateAction<File | null>>
    setFileFirstPlayerURL: Dispatch<SetStateAction<string | null>>
    setFileSecondPlayerURL: Dispatch<SetStateAction<string | null>>
}