import React from "react";
import {ResultsProps} from "./ResultsProps";
import './ResultsStyle.css';

function Results(props: ResultsProps) {
    return (
        <div>
            <form id="results">
                <div className="form-group">
                    <label className="names">{props.firstPlayerName}</label>
                    <h2 className="h2results" id="firstPlayerResults">{props.firstPlayerWins}</h2>
                </div>
                <div className="form-group">
                    <label className="names"><b><u>Ties</u></b></label>
                    <h2 className="h2results" id="tieResults">{props.ties}</h2>
                </div>
                <div className="form-group">
                    <label className="names">{props.secondPlayerName}</label>
                    <h2 className="h2results" id="secondPlayerResults">{props.secondPlayerWins}</h2>
                </div>
            </form>
        </div>
    );
}

export default Results;