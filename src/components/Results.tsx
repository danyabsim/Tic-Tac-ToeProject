import React from "react";
import {GameProps} from "./GameProps";
import {setFirstPlayer, setSecondPlayer} from "../XOScript";

function Results(props: GameProps) {
    setFirstPlayer(props.X);
    setSecondPlayer(props.O);
    return (
        <form id="results">
            <table>
                <tr>
                    <td>
                        <label className="names">{props.X}</label>
                    </td>
                    <td>
                        <h2 id="XResults">0</h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="names"><b><u>Tie</u></b></label>
                    </td>
                    <td>
                        <h2 id="tieResults">0</h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="names">{props.O}</label>
                    </td>
                    <td>
                        <h2 id="OResults">0</h2>
                    </td>
                </tr>
            </table>
        </form>
    );
}

export default Results;