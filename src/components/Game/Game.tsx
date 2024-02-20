import React, {useState} from "react";
import Results from "./Results/Results";
import Board from "./Board/Board";
import BottomButtons from "./BottomButtons/BottomButtons";
import {IGameProps} from "./IGameProps";
import {useDispatch, useSelector} from "react-redux";
import {resetTheResults} from "../../redux/Results/resultsSlice";
import {RootState} from "../../redux/store";

function Game(props: IGameProps) {
    const [isFirstPlayerStars, setIsFirstPlayerStars] = useState(true);
    const [XOArray, setXOArray] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const dispatch = useDispatch();
    const playersData = useSelector((state: RootState) => state.players.data); // need to be taken from server

    function ResetHandler() {
        dispatch(resetTheResults());
        setIsFirstPlayerStars(true);
        setXOArray([["", "", ""], ["", "", ""], ["", "", ""]]);
    }

    function NextGameHandler() {
        setXOArray([["", "", ""], ["", "", ""], ["", "", ""]]);
    }

    function ResetTheApp() {
        ResetHandler();
        props.ResetTheApp();
    }

    return (
        <div>
            <Results firstPlayer={playersData[0]} secondPlayer={playersData[1]}/>
            <Board firstPlayer={playersData[0]} secondPlayer={playersData[1]} XOArray={XOArray}
                   setXOArray={setXOArray} isFirstPlayerStars={isFirstPlayerStars}
                   setIsFirstPlayerStars={setIsFirstPlayerStars} ResetHandler={ResetHandler}
                   NextGameHandler={NextGameHandler} ResetTheApp={ResetTheApp}/>
            <BottomButtons ResetTheApp={ResetTheApp}/>
        </div>
    );
}

export default Game;