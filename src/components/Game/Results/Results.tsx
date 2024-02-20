import React from "react";
import {IResultsProps} from "./IResultsProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {noImage} from "../../../XOScript";
import PlayerResults from "./PlayerResults/PlayerResults";

function Results(props: IResultsProps) {
    const currentResults = useSelector((state: RootState) => state.results);
    return (
        <div className="m-0">
            <form className="flex justify-center items-center text-2xl text-white">
                <PlayerResults src={props.firstPlayer.url ? props.firstPlayer.url : noImage}
                               name={props.firstPlayer.name} result={currentResults.firstPlayerWins}/>
                <PlayerResults src={noImage} name="Ties" result={currentResults.ties}/>
                <PlayerResults src={props.secondPlayer.url ? props.secondPlayer.url : noImage}
                               name={props.secondPlayer.name} result={currentResults.secondPlayerWins}/>
            </form>
        </div>
    );
}

export default Results;