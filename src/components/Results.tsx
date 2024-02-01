import React from "react";
import {GameProps} from "./GameProps";
import {setFirstPlayer, setSecondPlayer} from "../XOScript";

function Results(props: GameProps) {
    setFirstPlayer(props.firstPlayerName);
    setSecondPlayer(props.secondPlayerName);
    return (
        <form id="results">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label className="names">{props.firstPlayerName}</label>
                        </td>
                        <td>
                            <h2 id="firstPlayerResults">{props.firstPlayerResults}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="names"><b><u>Tie</u></b></label>
                        </td>
                        <td>
                            <h2 id="tieResults">{props.tieResults}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="names">{props.secondPlayerName}</label>
                        </td>
                        <td>
                            <h2 id="secondPlayerResults">{props.secondPlayerResults}</h2>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default Results;