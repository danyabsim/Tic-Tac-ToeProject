import React, {useState} from "react";
import {IEnterFormProps} from "./IEnterFormProps";
import PlayerSign from "./PlayerSign/PlayerSign";
import GameActionButton from "../GameActionButton/GameActionButton";
import {addNewPlayer} from "../../redux/Players/playersSlice";
import {noImage} from "../../XOScript";
import {useDispatch} from "react-redux";
import InputEnterForm from "./InputEnterForm/InputEnterForm";

function EnterForm(props: IEnterFormProps) {
    const [currentPlayerName, setCurrentPlayerName] = useState('');
    const [currentPlayerSign, setCurrentPlayerSign] = useState('');
    const [fileCurrentPlayerURL, setFileCurrentPlayerURL] = useState<string | null>(null);
    const currentPlayer = {name: currentPlayerName, sign: currentPlayerSign, url: fileCurrentPlayerURL};
    const dispatch = useDispatch();

    function OnEnter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const isCurrentPlayerSignNotEmptyOrSpace = currentPlayerSign.trim() !== "" && currentPlayerSign.length === 1;
        const isCurrentPlayerURLNotEmpty = fileCurrentPlayerURL;
        if (currentPlayerName !== "" && props.roomCode !== "" && ((isCurrentPlayerSignNotEmptyOrSpace && !isCurrentPlayerURLNotEmpty) || (!isCurrentPlayerSignNotEmptyOrSpace && isCurrentPlayerURLNotEmpty))) {
            dispatch(addNewPlayer({name: currentPlayerName, sign: fileCurrentPlayerURL ? "File" : currentPlayerSign, url: fileCurrentPlayerURL}));
            dispatch(addNewPlayer({name: (currentPlayerName === 'Mr. Know It All' ? 'Abra Cad-bra' : 'Mr. Know It All'), sign: (currentPlayerSign === 'K' ? 'A' : 'K'), url: noImage}))
            props.OnEnter();
        } else {
            alert("Please fill in all the required fields!");
        }
    }

    function handleFileChange(acceptedFiles: File[]) {
        const files = acceptedFiles;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => (e && setFileCurrentPlayerURL(e.target?.result?.toString() || null));
            reader.readAsDataURL(files[0]);
        }
    }

    return (
        <form className="text-3xl flex flex-col items-center" onSubmit={OnEnter}>
            <div className="space-y-4">
                <InputEnterForm labelText="Your Player Name:" value={currentPlayer.name} enableSpace={true}
                                onChange={(event) => setCurrentPlayerName(event.currentTarget.value)}/>
                <PlayerSign currentPlayer={currentPlayer} setCurrentPlayerSign={setCurrentPlayerSign}
                            handleFileChange={handleFileChange}
                            setFileCurrentPlayerURL={setFileCurrentPlayerURL}/>
                <InputEnterForm labelText="Room Code:" value={props.roomCode}
                                onChange={(event) => props.setRoomCode(event.currentTarget.value)}/>
                <br/>
                <GameActionButton value="Enter" type="submit"/>
            </div>
        </form>
    );
}

export default EnterForm;