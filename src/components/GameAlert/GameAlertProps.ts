import {Dispatch, SetStateAction} from "react";

export interface GameAlertProps {
    alertText: string;
    modalIsOpen : boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}