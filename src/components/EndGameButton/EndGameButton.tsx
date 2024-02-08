import './EndGameButtonStyle.css';
import {EndGameButtonProps} from "./EndGameButtonProps";
import {resetXOScript} from "../../XOScript";

function EndGameButton(props: EndGameButtonProps) {
    function exitHandler() {
        resetXOScript();
        props.resetTheApp();
    }

    return (
        <div>
            <form id="endGameButton">
                <input type="submit" className="form-group" id="exit" onClick={exitHandler} value="Exit" />
            </form>
        </div>
    );
}

export default EndGameButton;