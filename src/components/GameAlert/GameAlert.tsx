import Modal from 'react-modal';
import {GameAlertProps} from "./GameAlertProps";
import React, {useRef, useState} from "react";
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {addHistory, consolePrint, exportHistoryToFile, updateLatestHistory} from '../../redux/historySlice';
import {resetXOScript} from "../../XOScript";

function GameAlert(props: GameAlertProps) {
    // 'https://i.pinimg.com/originals/e4/d2/c1/e4d2c1d0da356797359acd9270bcdd77.gif' was the photo originally before moving to Tailwind.
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
                firstPlayerName: props.firstPlayer.name,
                secondPlayerName: props.secondPlayer.name,
                firstPlayerWins: firstPlayerWins,
                ties: ties,
                secondPlayerWins: secondPlayerWins,
            }));
        } else {
            dispatch(updateLatestHistory({
                firstPlayerName: props.firstPlayer.name,
                secondPlayerName: props.secondPlayer.name,
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
            className="z-50 w-600 h-300 bg-cover text-center flex flex-col justify-center items-center"
            style={{
                content: {
                    marginLeft: (props.solvedChar === props.firstPlayer.sign ? '0' : 'auto'),
                    marginRight: (props.solvedChar === props.secondPlayer.sign ? '0' : 'auto')
                }
            }}
        >
            <audio ref={audioRef}
                   src={process.env.PUBLIC_URL + '/sounds/Audience_Applause-Matthiew11-1206899159.wav'}
                   onError={(e) => console.error('Audio error:', e)}/>
            <div id="reactModal">
                <div className="text-4xl bg-green-500 text-black border-none font-bold">
                    {currentHistory?.firstPlayerName}: {currentHistory?.firstPlayerWins} (Ties: {currentHistory?.ties}) {currentHistory?.secondPlayerName}: {currentHistory?.secondPlayerWins}
                </div>
                <h2 className="text-black text-4xl my-[30px] mb-[100px]">{props.alertText}</h2>
                <input type="button" className="ext-black border-2 border-black font-bold cursor-pointer ml-10 mr-10 inline-block text-4xl mb-0 bg-green-500" onClick={resetHandler} value="Reset"/>
                <input type="button" className="text-black border-2 border-black font-bold cursor-pointer ml-10 mr-10 inline-block text-4xl mb-0 bg-green-500" onClick={nextGameHandler} value="Next Game"/>
                <input type="submit" className="text-black border-2 border-black font-bold cursor-pointer ml-10 mr-10 inline-block text-4xl mb-0 bg-green-500" onClick={exitHandler} value="Exit"/>
                <input type="button" className="text-black border-2 border-black font-bold cursor-pointer ml-10 mr-10 inline-block text-4xl mb-0 bg-green-500" value="Export History"
                       onClick={() => dispatch(exportHistoryToFile())}/>
            </div>
        </Modal>
    );
}

export default GameAlert;