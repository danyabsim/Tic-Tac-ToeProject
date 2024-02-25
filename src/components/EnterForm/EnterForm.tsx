import React, {useState} from "react";
import {IEnterFormProps} from "./IEnterFormProps";
import PlayerSign from "./PlayerSign/PlayerSign";
import GameActionButton from "../GameActionButton/GameActionButton";
import InputEnterForm from "./InputEnterForm/InputEnterForm";
import Client from "../../Client/Client";

function EnterForm(props: IEnterFormProps) {
    const [currentPlayerName, setCurrentPlayerName] = useState('');
    const [currentPlayerSign, setCurrentPlayerSign] = useState('');
    const [fileCurrentPlayerURL, setFileCurrentPlayerURL] = useState<string | null>(null);
    const currentPlayer = {name: currentPlayerName, sign: currentPlayerSign, url: fileCurrentPlayerURL};
    const [isOn, setIsOn] = useState(false);
    // const dispatch = useDispatch();

    async function OnEnter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const isCurrentPlayerSignNotEmpty = currentPlayerSign.length === 1;
        const isCurrentPlayerURLNotEmpty = fileCurrentPlayerURL;
        if (currentPlayerName !== "" && props.roomCode !== "" && ((isCurrentPlayerSignNotEmpty && !isCurrentPlayerURLNotEmpty) || (!isCurrentPlayerSignNotEmpty && isCurrentPlayerURLNotEmpty))) {
            // dispatch(addNewPlayer({name: currentPlayerName, sign: fileCurrentPlayerURL ? "File" : currentPlayerSign, url: fileCurrentPlayerURL}));
            // dispatch(addNewPlayer({name: (currentPlayerName === 'Mr. Know It All' ? 'Abra Cad-bra' : 'Mr. Know It All'), sign: (currentPlayerSign.toUpperCase() === 'K' ? 'A' : 'K'), url: noImage}))
            setIsOn(true);
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
                <Client functionName='addPlayer' args={[currentPlayerName, fileCurrentPlayerURL ? "File" : currentPlayerName !== "" ? currentPlayerSign : "null", fileCurrentPlayerURL ? fileCurrentPlayerURL : "null", props.roomCode]} isOn={isOn}/>
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