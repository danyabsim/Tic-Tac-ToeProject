import {IBottomButtonsProps} from "./IBottomButtonsProps";
import {resetXOScript} from "../../../XOScript";
import {useDispatch, useSelector} from "react-redux";
import GameActionButton from "../../GameActionButton/GameActionButton";
import React from "react";
import {RootState} from "../../../redux/store";
import * as historySlice from "../../../redux/History/historySlice";

function BottomButtons(props: IBottomButtonsProps) {
    const dispatch = useDispatch();
    const historyArray = useSelector((state: RootState) => state.history.historyArray);

    function exitHandler() {
        resetXOScript();
        props.ResetTheApp();
    }

    return (
        <div className="flex justify-center items-center">
            <form className="mt-8 text-black text-4xl text-center font-bold">
                <GameActionButton onClick={exitHandler} value="Exit"/>
                <GameActionButton value="Export History (JSON)"
                                  onClick={() => setTimeout(() => (historyArray.length !== 0 ? dispatch(historySlice.exportHistoryToFile()) : null), 100)}/>
                <GameActionButton value="Export History (Excel)"
                                  onClick={() => setTimeout(() => (historyArray.length !== 0 ? dispatch(historySlice.exportHistoryToExcel()) : null), 100)}/>
            </form>
        </div>
    );
}

export default BottomButtons;