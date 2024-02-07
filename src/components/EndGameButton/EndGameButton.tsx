import './EndGameButtonStyle.css';
import {EndGameButtonProps} from "./EndGameButtonProps";
import {resetXOScript} from "../../XOScript";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";

function EndGameButton(props: EndGameButtonProps) {
    const dispatch = useDispatch();
    const historyArray = useSelector((state: RootState) => state.history.historyArray);

    function exitHandler() {
        resetXOScript(dispatch, historyArray);
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