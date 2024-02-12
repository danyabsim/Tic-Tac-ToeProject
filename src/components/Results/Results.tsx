import React from "react";
import {ResultsProps} from "./ResultsProps";
import './ResultsStyle.css';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

function Results(props: ResultsProps) {
    const currentResults = useSelector((state: RootState) => state.results);
    const noImage = process.env.PUBLIC_URL + 'grunge-black-concrete-textured-background_53876-124541.avif';
    return (
        <div>
            <form id="results">
                <div className="form-group">
                    <img src={props.firstPlayer.URL ? props.firstPlayer.URL : noImage} alt=""/>
                    <label className="names">{props.firstPlayer.name}</label>
                    <h2 className="h2results" id="firstPlayerResults">{currentResults.firstPlayerWins}</h2>
                </div>
                <div className="form-group">
                    <img src={noImage} alt=""/>
                    <label className="names"><b><u>Ties</u></b></label>
                    <h2 className="h2results" id="tieResults">{currentResults.ties}</h2>
                </div>
                <div className="form-group">
                    <img src={props.secondPlayer.URL ? props.secondPlayer.URL : noImage} alt=""/>
                    <label className="names">{props.secondPlayer.name}</label>
                    <h2 className="h2results" id="secondPlayerResults">{currentResults.secondPlayerWins}</h2>
                </div>
            </form>
        </div>
    );
}

export default Results;