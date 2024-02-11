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
                    <img src={props.fileFirstPlayerURL ? props.fileFirstPlayerURL : noImage} alt=""/>
                    <label className="names">{props.firstPlayerName}</label>
                    <h2 className="h2results" id="firstPlayerResults">{currentResults.firstPlayerWins}</h2>
                </div>
                <div className="form-group">
                    <img src={noImage} alt=""/>
                    <label className="names"><b><u>Ties</u></b></label>
                    <h2 className="h2results" id="tieResults">{currentResults.ties}</h2>
                </div>
                <div className="form-group">
                    <img src={props.fileSecondPlayerURL ? props.fileSecondPlayerURL : noImage} alt=""/>
                    <label className="names">{props.secondPlayerName}</label>
                    <h2 className="h2results" id="secondPlayerResults">{currentResults.secondPlayerWins}</h2>
                </div>
            </form>
        </div>
    );
}

export default Results;