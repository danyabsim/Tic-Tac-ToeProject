// Import react-modal at the top of your file
import Modal from 'react-modal';
import {GameAlertProps} from "./GameAlertProps";
import './GameAlertStyle.css';
import React, {useRef, useState} from "react";
import {ResultsProps} from "../Results/ResultsProps";
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {addHistory, updateLatestHistory, consolePrint, removeTheOldestHistory} from '../../redux/historySlice';
import {resetXOScript} from "../../XOScript";

function GameAlert(props : GameAlertProps & ResultsProps) {
    const backgroundImageUrl = 'https://i.pinimg.com/originals/e4/d2/c1/e4d2c1d0da356797359acd9270bcdd77.gif';
    const direction = props.solvedChar === 'X' ? 'left' : (props.solvedChar === 'O' ? 'right' : 'center');
    const dispatch = useDispatch();
    const historyArray = useSelector((state: RootState) => state.history.historyArray);
    const [countUpdate, setCountUpdate] = useState(0);

    // Function to close the modal and perform additional action
    const closeModalAndPerformAction = () => {
        resetXOScript(dispatch, historyArray);
        props.setModalIsOpen(false);
        console.log('User clicked On One of The Buttons!');
    };

    function resetHandler() {
        closeModalAndPerformAction();
        dispatch(addHistory({ ...props }));
        dispatch(consolePrint());
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
            dispatch(addHistory({ ...props }));
        } else {
            dispatch(updateLatestHistory({ ...props }));
        }
        setCountUpdate(countUpdate + 1);
        if (audioRef.current) {
            audioRef.current.play().then(r => r);
        }
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={closeModalAndPerformAction}
            onAfterOpen={openModalAndPerformAction}
            contentLabel="Game Result"
            shouldCloseOnOverlayClick={false}
            style={{
                overlay: { zIndex: 9999 },
                content: {
                    width: 500,
                    height: 300,
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover', // You can customize this based on your needs
                    marginLeft: direction === 'left' ? '0' : 'auto',
                    marginRight: direction === 'right' ? '0' : 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <audio ref={audioRef} src={process.env.PUBLIC_URL + '/sounds/Audience_Applause-Matthiew11-1206899159.wav'} onError={(e) => console.error('Audio error:', e)} />
            <div className="form-group" id="reactModal">
                {historyArray.map((item, index) => (
                    <div className="historyArray" key={index}>
                        {item.firstPlayerName}: {item.firstPlayerWins} (Ties: {item.ties}) {item.secondPlayerName}: {item.secondPlayerWins}</div>
                ))}
                <h2 id="alertText">{props.alertText}</h2>
                <input type="button" className="form-group" id="reset" onClick={resetHandler} value="Reset" />
                <input type="button" className="form-group" id="nextGame" onClick={nextGameHandler} value="Next Game" />
                <input type="submit" className="form-group" id="exit" onClick={exitHandler} value="Exit" />
            </div>
        </Modal>
    );
}

export default GameAlert;