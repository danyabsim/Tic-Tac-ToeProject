import {IPlayerResultsProps} from "./IPlayerResultsProps";
import React from "react";

function PlayerResults(props: IPlayerResultsProps) {
    return (
        <div className="mb-10 space-y-4">
            <img className="block mx-auto h-24 w-24 object-cover mb-2" src={props.src} alt=""/>
            <label className="block w-[180px] mb-2">{props.name}</label>
            <h2 className="block text-green-500 mb-2">{props.result}</h2>
        </div>
    );
}

export default PlayerResults;