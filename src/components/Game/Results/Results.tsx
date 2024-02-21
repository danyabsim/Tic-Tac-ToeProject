import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {noImage} from "../../../XOScript";
import PlayerResults from "./PlayerResults/PlayerResults";

function Results() {
    const currentResults = useSelector((state: RootState) => state.results);
    const playersData = useSelector((state: RootState) => state.players.data); // need to be taken from server
    const firstPlayer = playersData[0];
    const secondPlayer = playersData[1];

    return (
        <div className="m-0">
            <form className="flex justify-center items-center text-2xl text-white">
                <PlayerResults src={firstPlayer.url ? firstPlayer.url : noImage}
                               name={firstPlayer.name} result={currentResults.firstPlayerWins}/>
                <PlayerResults src={noImage} name="Ties" result={currentResults.ties}/>
                <PlayerResults src={secondPlayer.url ? secondPlayer.url : noImage}
                               name={secondPlayer.name} result={currentResults.secondPlayerWins}/>
            </form>
        </div>
    );
}

export default Results;