import Modal from 'react-modal';
import {GameAlertProps} from "./GameAlertProps";
import React, {useRef, useState} from "react";
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {
    addHistory,
    consolePrint,
    exportHistoryToExcel,
    exportHistoryToFile,
    updateLatestHistory
} from '../../redux/historySlice';
import {resetXOScript} from "../../XOScript";
import {BackgroundImage} from "../../styleComponents/BackgroundImage";
import GameActionButton from "../GameActionButton/GameActionButton";

function GameAlert(props: GameAlertProps) {
    const dispatch = useDispatch();
    const historyArray = useSelector((state: RootState) => state.history.historyArray);
    const {firstPlayerWins, ties, secondPlayerWins} = useSelector((state: RootState) => state.results);
    const [countUpdate, setCountUpdate] = useState(0);
    const currentHistory = historyArray[historyArray.length - 1];

    // Function to close the modal and perform additional action
    const closeModalAndPerformAction = () => {
        setTimeout(function (): void {
            dispatch(consolePrint());
        }, 100);
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
        console.log(historyArray);
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
            className={`text-black text-4xl text-center font-bold flex flex-col justify-center items-center`}
        >
            <BackgroundImage
                $marginLeft={props.solvedChar === props.firstPlayer.sign ? '0' : 'auto'}
                $marginRight={props.solvedChar === props.secondPlayer.sign ? '0' : 'auto'}
            >
                <audio ref={audioRef}
                       src={process.env.PUBLIC_URL + '/sounds/Audience_Applause-Matthiew11-1206899159.wav'}
                       onError={(e) => console.error('Audio error:', e)}/>
                <div>
                    <div className="bg-green-500 border-none">
                        {currentHistory?.firstPlayerName}: {currentHistory?.firstPlayerWins} (Ties: {currentHistory?.ties}) {currentHistory?.secondPlayerName}: {currentHistory?.secondPlayerWins}
                    </div>
                    <h2 className="my-[30px] mb-[100px]">{props.alertText}</h2>
                    <GameActionButton
                        onClick={resetHandler}
                        value="Reset"
                    />
                    <GameActionButton
                        onClick={nextGameHandler}
                        value="Next Game"
                    />
                    <GameActionButton
                        onClick={exitHandler}
                        value="Exit"
                    />
                </div>
                <div>
                    <GameActionButton
                        value="Export History (JSON)"
                        onClick={() =>
                            setTimeout(function (): void {
                                dispatch(exportHistoryToFile())
                            }, 100)
                        }
                    />
                    <GameActionButton
                        value="Export History (Excel)"
                        onClick={() =>
                            setTimeout(function (): void {
                                dispatch(exportHistoryToExcel())
                            }, 100)
                        }
                    />
                </div>
            </BackgroundImage>
        </Modal>
    );
}

export default GameAlert;