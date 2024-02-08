import React from "react";
import {EnterFormProps} from "./EnterFormProps";
import './EnterFormStyle.css';

function EnterForm(props: EnterFormProps) {
    return (
        <form id="enter" onSubmit={props.onEnter}>
            <div className="form-group">
                <label htmlFor="firstPlayerName">First Player Name:</label>
                <input
                    id="firstPlayerName"
                    type="text"
                    value={props.firstPlayerName}
                    onChange={(event) => {props.setFirstPlayerName(event.currentTarget.value)}}
                    data-testid="firstPlayerName" />
                <label htmlFor="firstPlayerSign">First Player Sign:</label>
                <input
                    id="firstPlayerSign"
                    type="text"
                    value={props.firstPlayerSign}
                    onChange={(event) => {props.setFirstPlayerSign(event.currentTarget.value)}}
                    data-testid="firstPlayerSign" />
            </div>

            <div className="form-group">
                <label htmlFor="secondPlayerName">Second Player Name:</label>
                <input
                    id="secondPlayerName"
                    type="text"
                    value={props.secondPlayerName}
                    onChange={(event) => {props.setSecondPlayerName(event.currentTarget.value)}}
                    data-testid="secondPlayerName" />
                <label htmlFor="secondPlayerSign">Second Player Sign:</label>
                <input
                    id="secondPlayerSign"
                    type="text"
                    value={props.secondPlayerSign}
                    onChange={(event) => {props.setSecondPlayerSign(event.currentTarget.value)}}
                    data-testid="secondPlayerSign" />
            </div>

            <div className="form-group">
                <input id="enter" type="submit" value="Enter" data-testid="submit" />
            </div>
        </form>
    );
}

export default EnterForm;