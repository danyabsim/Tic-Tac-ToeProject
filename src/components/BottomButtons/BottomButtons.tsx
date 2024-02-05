import React from "react";
import {BottomButtonsProps} from "./BottomButtonsProps";
import './BottomButtonsStyle.css';
import {checkBoard, resetXOScript, XOCount} from "../../XOScript";

function BottomButtons(props: BottomButtonsProps) {

    function resetHandler() {
        props.setIsFirstPlayerStars(true);
        props.setFirstPlayerResults(0);
        props.setTieResults(0);
        props.setSecondPlayerResults(0);
        props.setXOArray([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
        resetXOScript(props.isFirstPlayerStars);
    }

    function nextGameHandler() {
        if (XOCount === 9 || checkBoard(props.XOArray)[0]) {
            props.setXOArray([
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ]);
            resetXOScript(props.isFirstPlayerStars);
        } else if (XOCount !== 0) {
            alert("You have to finish your game before you go to the next one!");
        }
    }

    return (
        <div>
            <form className="downButtons">
                <span className="form-group" id="reset" onClick={resetHandler}>Reset</span>
                <span className="form-group" id="nextGame" onClick={nextGameHandler}>Next Game</span>
                <span className="form-group" id="exit" onClick={() => window.location.reload()}>Exit</span>
           </form>
        </div>
    );
}

export default BottomButtons;