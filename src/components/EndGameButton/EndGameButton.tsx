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
        <div className="flex justify-center items-center">
            <form className="mt-8">
                <input type="submit" className="ml-10 mr-10 inline-block text-4xl mb-0 bg-green-500 text-black border-2 border-black font-bold cursor-pointer" onClick={exitHandler} value="Exit" />
                <input type="button" className="ml-10 mr-10 inline-block text-4xl mb-0 bg-green-500 text-black border-2 border-black font-bold cursor-pointer" value="Export History" onClick={() => dispatch(exportHistoryToFile())} />
            </form>
        </div>
    );
}

export default EndGameButton;