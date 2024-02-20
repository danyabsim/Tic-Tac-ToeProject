import React, {ChangeEvent, useState} from "react";
import {IEnterFormProps} from "./IEnterFormProps";
import PlayerSign from "./PlayerSign/PlayerSign";
import PlayerName from "./PlayerName/PlayerName";
import RoomCode from "./RoomCode/RoomCode";
import GameActionButton from "../GameActionButton/GameActionButton";
import {addNewPlayer} from "../../redux/Players/playersSlice";
import {noImage} from "../../XOScript";
import {useDispatch} from "react-redux";

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

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => (e && setFileCurrentPlayerURL(e.target?.result?.toString() || null));
            reader.readAsDataURL(files[0]);
        }
    }

    return (
        <form className="text-3xl text-center flex flex-col items-center" onSubmit={OnEnter}>
            <div className="space-y-4">
                <PlayerName currentPlayer={currentPlayer} setCurrentPlayerName={setCurrentPlayerName}/>
                <PlayerSign currentPlayer={currentPlayer} setCurrentPlayerSign={setCurrentPlayerSign}
                            handleFileChange={handleFileChange}
                            setFileCurrentPlayerURL={setFileCurrentPlayerURL}/>
                <RoomCode roomCode={props.roomCode} setRoomCode={props.setRoomCode}/>
                <br/>
                <GameActionButton className="text-black" value="Enter" type="submit"/>
            </div>
        </form>
    );
}

export default EnterForm;