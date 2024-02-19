import React from "react";
import {IResultsProps} from "./IResultsProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

function Results(props: IResultsProps) {
    const currentResults = useSelector((state: RootState) => state.results);
    const noImage = process.env.PUBLIC_URL + 'grunge-black-concrete-textured-background_53876-124541.avif';

    return (
        <div className="m-0">
            <form className="flex justify-center items-center">
                <div className="mb-10 space-y-4 text-2xl text-white">
                    <img className="block mx-auto h-24 w-24 object-cover mb-2" src={props.firstPlayer.URL ? props.firstPlayer.URL : noImage} alt=""/>
                    <label className="block w-[180px] mb-2">{props.firstPlayer.name}</label>
                    <h2 className="block text-green-500 mb-2">{currentResults.firstPlayerWins}</h2>
                </div>
                <div className="mb-10 space-y-4 text-2xl text-white">
                    <img className="block mx-auto h-24 w-24 object-cover mb-2" src={noImage} alt=""/>
                    <label className="block w-[180px] mb-2"><b><u>Ties</u></b></label>
                    <h2 className="block text-green-500 mb-2">{currentResults.ties}</h2>
                </div>
                <div className="mb-10 space-y-4 text-2xl text-white">
                    <img className="block mx-auto h-24 w-24 object-cover mb-2" src={props.secondPlayer.URL ? props.secondPlayer.URL : noImage} alt=""/>
                    <label className="block w-[180px] mb-2">{props.secondPlayer.name}</label>
                    <h2 className="block text-green-500 mb-2">{currentResults.secondPlayerWins}</h2>
                </div>
            </form>
        </div>
    );
}

export default Results;