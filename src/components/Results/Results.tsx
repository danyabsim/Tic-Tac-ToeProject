import React from "react";
import {ResultsProps} from "./ResultsProps";
import './ResultsStyle.css';

function Results(props: ResultsProps) {
    return (
        <form id="results">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label className="names">{props.firstPlayerName}</label>
                        </td>
                        <td>
                            <h2 className="h2results" id="firstPlayerResults">{props.firstPlayerResults}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="names"><b><u>Tie</u></b></label>
                        </td>
                        <td>
                            <h2 className="h2results" id="tieResults">{props.tieResults}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="names">{props.secondPlayerName}</label>
                        </td>
                        <td>
                            <h2 className="h2results" id="secondPlayerResults">{props.secondPlayerResults}</h2>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default Results;