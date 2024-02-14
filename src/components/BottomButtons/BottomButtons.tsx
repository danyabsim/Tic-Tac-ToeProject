import {BottomButtonsProps} from "./BottomButtonsProps";
import {resetXOScript} from "../../XOScript";
import {exportHistoryToFile} from "../../redux/historySlice";
import {useDispatch} from "react-redux";
import GameActionButton from "../GameActionButton/GameActionButton";

function BottomButtons(props: BottomButtonsProps) {
    const dispatch = useDispatch();

    function exitHandler() {
        resetXOScript();
        props.resetTheApp();
    }

    return (
        <div className="flex justify-center items-center">
            <form className="mt-8 text-black text-4xl text-center font-bold">
                <GameActionButton
                    onClick={exitHandler}
                    value="Exit"
                />
                <GameActionButton
                    value="Export History"
                    onClick={() => dispatch(exportHistoryToFile())}
                />
            </form>
        </div>
    );
}

export default BottomButtons;