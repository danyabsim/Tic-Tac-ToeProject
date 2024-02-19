import Modal from 'react-modal';
import {IGameAlertProps} from "./IGameAlertProps";
import React, {useRef, useState} from "react";
import {RootState} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import * as historySlice from '../../../redux/History/historySlice';
import {resetXOScript} from "../../../XOScript";
import {BackgroundImage} from "../../../styleComponents/BackgroundImage";
import GameActionButton from "../../GameActionButton/GameActionButton";

function GameAlert(props: IGameAlertProps) {
    const dispatch = useDispatch();
    const historyArray = useSelector((state: RootState) => state.history.historyArray);
    const {firstPlayerWins, ties, secondPlayerWins} = useSelector((state: RootState) => state.results);
    const [countUpdate, setCountUpdate] = useState(0);
    const currentHistory = historyArray[historyArray.length - 1];
    const audioRef = useRef<HTMLAudioElement>(null);

    function CloseGameAlert(additionalCode: () => void) {
        resetXOScript();
        props.setModalIsOpen(false);
        additionalCode();
    }

    function openModalAndPerformAction() {
        if (countUpdate === 0) {
            dispatch(historySlice.addHistory({
                firstPlayerName: props.firstPlayer.name, secondPlayerName: props.secondPlayer.name,
                firstPlayerWins: firstPlayerWins, ties: ties, secondPlayerWins: secondPlayerWins,
            }));
        } else {
            dispatch(historySlice.updateLatestHistory({
                firstPlayerName: props.firstPlayer.name, secondPlayerName: props.secondPlayer.name,
                firstPlayerWins: firstPlayerWins, ties: ties, secondPlayerWins: secondPlayerWins,
            }));
        }
        setCountUpdate(countUpdate + 1);
        audioRef.current?.play().then(r => r);
    }

    return (
        <Modal isOpen={props.modalIsOpen} onAfterOpen={openModalAndPerformAction} shouldCloseOnOverlayClick={false}
               className={`text-black text-4xl text-center font-bold flex flex-col justify-center items-center`}
        >
            <BackgroundImage
                $marginLeft={props.solvedChar === props.firstPlayer.sign ? '0' : 'auto'}
                $marginRight={props.solvedChar === props.secondPlayer.sign ? '0' : 'auto'}
            >
                <audio ref={audioRef} src={process.env.PUBLIC_URL + '/sounds/Audience_Applause.wav'}
                       onError={(e) => console.error('Audio error:', e)}/>
                <div>
                    <div className="bg-green-500 border-none">
                        {currentHistory?.firstPlayerName}: {currentHistory?.firstPlayerWins} (Ties: {currentHistory?.ties}) {currentHistory?.secondPlayerName}: {currentHistory?.secondPlayerWins}
                    </div>
                    <h2 className="my-[30px] mb-[100px]">{props.alertText}</h2>
                    <GameActionButton value="Reset" onClick={() => CloseGameAlert(props.resetHandler)}/>
                    <GameActionButton value="Next Game" onClick={() => CloseGameAlert(props.nextGameHandler)}/>
                    <GameActionButton value="Exit" onClick={() => CloseGameAlert(props.resetTheApp)}/>
                </div>
                <div>
                    <GameActionButton value="Export History (JSON)"
                                      onClick={() => setTimeout(() => dispatch(historySlice.exportHistoryToFile()), 100)}/>
                    <GameActionButton value="Export History (Excel)"
                                      onClick={() => setTimeout(() => dispatch(historySlice.exportHistoryToExcel()), 100)}/>
                </div>
            </BackgroundImage>
        </Modal>
    );
}

export default GameAlert;