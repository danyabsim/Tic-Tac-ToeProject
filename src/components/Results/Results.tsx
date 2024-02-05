import React from "react";
import {ResultsProps} from "./ResultsProps";
import './ResultsStyle.css';

function Results(props: ResultsProps) {
    return (
        <div>
            <form id="results">
                <div className="form-group">
                    <label className="names">{props.firstPlayerName}</label>
                    <h2 className="h2results" id="firstPlayerResults">{props.firstPlayerResults}</h2>
                </div>
                <div className="form-group">
                    <label className="names"><b><u>Tie</u></b></label>
                    <h2 className="h2results" id="tieResults">{props.tieResults}</h2>
                </div>
                <div className="form-group">
                    <label className="names">{props.secondPlayerName}</label>
                    <h2 className="h2results" id="secondPlayerResults">{props.secondPlayerResults}</h2>
                </div>
            </form>
        </div>
    );
}

export default Results;