import React from "react";
import {GameProps} from "./GameProps";

function BottomButtons(props: GameProps) {
    function resetHandler() {
        props.setIsFirstPlayerStars(true);
        props.setFirstPlayerResults(0);
        props.setTieResults(0);
        props.setSecondPlayerResults(0);
        props.setXOArray([["","",""],["","",""],["","",""]]);
    }

    function nextGameHandler() {
        props.setIsFirstPlayerStars(!props.isFirstPlayerStars);
        props.setXOArray([["","",""],["","",""],["","",""]]);
    }

    return (
        <table className="downButtons">
            <tbody>
                <tr>
                    <td>
                        <input type="reset" className="reset" onClick={resetHandler}/>
                    </td>
                    <td>
                        <input type="button" className="nextGame" onClick={nextGameHandler} value="Next Game"/>
                    </td>
                    <td>
                        <input type="button" className="exit" onClick={() => window.location.reload()} value="Exit"/>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default BottomButtons;