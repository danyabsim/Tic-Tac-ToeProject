import Modal from 'react-modal';
import {GameAlertProps} from "./GameAlertProps";
import './GameAlertStyle.css';
import React, {useRef, useState} from "react";
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {addHistory, consolePrint, updateLatestHistory} from '../../redux/historySlice';
import {resetXOScript} from "../../XOScript";
import {contentStyles, overlayStyles} from "./GameAlertScriptsStyle";

function GameAlert(props: GameAlertProps) {
    const dispatch = useDispatch();
    const historyArray = useSelector((state: RootState) => state.history.historyArray);
    const {firstPlayerWins, ties, secondPlayerWins} = useSelector((state: RootState) => state.results);
    const [countUpdate, setCountUpdate] = useState(0);
    const currentHistory = historyArray[historyArray.length - 1];

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
            dispatch(addHistory({
                firstPlayerName: props.firstPlayerName,
                secondPlayerName: props.secondPlayerName,
                firstPlayerWins: firstPlayerWins,
                ties: ties,
                secondPlayerWins: secondPlayerWins,
            }));
        } else {
            dispatch(updateLatestHistory({
                firstPlayerName: props.firstPlayerName,
                secondPlayerName: props.secondPlayerName,
                firstPlayerWins: firstPlayerWins,
                ties: ties,
                secondPlayerWins: secondPlayerWins,
            }));
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
                    {currentHistory?.firstPlayerName}: {currentHistory?.firstPlayerWins} (Ties: {currentHistory?.ties}) {currentHistory?.secondPlayerName}: {currentHistory?.secondPlayerWins}
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