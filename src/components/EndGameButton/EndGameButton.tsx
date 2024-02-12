import './EndGameButtonStyle.css';
import {EndGameButtonProps} from "./EndGameButtonProps";
import {resetXOScript} from "../../XOScript";
import {exportHistoryToFile} from "../../redux/historySlice";
import {useDispatch} from "react-redux";

function EndGameButton(props: EndGameButtonProps) {
    const dispatch = useDispatch();

    function exitHandler() {
        resetXOScript();
        props.resetTheApp();
    }

    return (
        <div>
            <form id="endGameButton">
                <input type="submit" className="form-group" id="exit" onClick={exitHandler} value="Exit" />
                <input type="button" className="form-group" id="export" value="Export History" onClick={() => dispatch(exportHistoryToFile())} />
            </form>
        </div>
    );
}

export default EndGameButton;