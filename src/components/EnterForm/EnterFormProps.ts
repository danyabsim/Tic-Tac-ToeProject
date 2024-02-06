import {Dispatch, FormEventHandler, SetStateAction} from "react";

export interface EnterFormProps {
    onEnter: FormEventHandler<HTMLFormElement>;
    firstPlayerName: string;
    secondPlayerName: string;
    setFirstPlayerName: Dispatch<SetStateAction<string>>;
    setSecondPlayerName: Dispatch<SetStateAction<string>>;
}