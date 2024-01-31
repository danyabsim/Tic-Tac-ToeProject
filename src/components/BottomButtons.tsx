import {restartTheBoard} from "../XOScript";
import React from "react";

function BottomButtons() {
    return (
        <table className="downButtons">
            <tr>
                <td>
                    <input type="reset" className="reset" onClick={() => restartTheBoard(true)}/>
                </td>
                <td>
                    <input type="button" className="nextGame" onClick={() => restartTheBoard(false)} value="Next Game"/>
                </td>
                <td>
                    <input type="button" className="exit" onClick={() => window.location.reload()} value="Exit"/>
                </td>
            </tr>
        </table>
    );
}

export default BottomButtons;