import React from "react";
import {IPlayerNameProps} from "./IPlayerNameProps";

function PlayerName(props: IPlayerNameProps) {
    return (
        <>
            <label className="block mb-2">Your Player Name:</label>
            <input
                className="inline-block text-center text-black"
                type="text"
                value={props.currentPlayer.name}
                onChange={(event) => {
                    props.setCurrentPlayerName(event.currentTarget.value);
                }}
                data-testid="playerName"
            />
        </>
    );
}

export default PlayerName;