import Modal from 'react-modal';
import {GameAlertProps} from "./GameAlertProps";
import './GameAlertStyle.css';
import React, {useRef, useState} from "react";
import {ResultsProps} from "../Results/ResultsProps";
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {addHistory, consolePrint, updateLatestHistory} from '../../redux/historySlice';
import {resetXOScript} from "../../XOScript";
import {contentStyles, overlayStyles} from "./GameAlertScriptsStyle";

function GameAlert(props: GameAlertProps & ResultsProps) {
    const dispatch = useDispatch();
    const historyArray = useSelector((state: RootState) => state.history.historyArray);
    const [countUpdate, setCountUpdate] = useState(0);

    // Function to close the modal and perform additional action
    const closeModalAndPerformAction = () => {
        dispatch(consolePrint());
        resetXOScript();
        props.setModalIsOpen(false);
        console.log('User Clicked On One of The Buttons!');
    };

    function resetHandler() {
        closeModalAndPerformAction();
        props.resetHandler();
    }

    function nextGameHandler() {
        closeModalAndPerformAction();
        props.nextGameHandler();
    }

    function exitHandler() {
        closeModalAndPerformAction();
        props.resetTheApp();
    }

    const audioRef = useRef<HTMLAudioElement>(null);

    function openModalAndPerformAction() {
        if (countUpdate === 0) {
            dispatch(addHistory({...props}));
        } else {
            dispatch(updateLatestHistory({...props}));
        }
        setCountUpdate(countUpdate + 1);
        if (audioRef.current) {
            audioRef.current.play().then(r => r);
        }
        console.log(historyArray);
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={closeModalAndPerformAction}
            onAfterOpen={openModalAndPerformAction}
            contentLabel="Game Result"
            shouldCloseOnOverlayClick={false}
            style={{
                overlay: overlayStyles(),
                content: contentStyles(props.solvedChar, props.firstPlayerSign, props.secondPlayerSign)
            }}
        >
            <audio ref={audioRef}
                   src={process.env.PUBLIC_URL + '/sounds/Audience_Applause-Matthiew11-1206899159.wav'}
                   onError={(e) => console.error('Audio error:', e)}/>
            <div className="form-group" id="reactModal">
                <div className="historyArray">
                    {historyArray[0]?.firstPlayerName}: {historyArray[0]?.firstPlayerWins} (Ties: {historyArray[0]?.ties}) {historyArray[0]?.secondPlayerName}: {historyArray[0]?.secondPlayerWins}
                </div>
                <h2 id="alertText">{props.alertText}</h2>
                <input type="button" className="form-group" id="reset" onClick={resetHandler} value="Reset"/>
                <input type="button" className="form-group" id="nextGame" onClick={nextGameHandler}
                       value="Next Game"/>
                <input type="submit" className="form-group" id="exit" onClick={exitHandler} value="Exit"/>
            </div>
        </Modal>
    );
}

export default GameAlert;