import React from "react";
import {EnterFormProps} from "./EnterFormProps";
import './EnterFormStyle.css';

function EnterForm(props: EnterFormProps) {
    return (
        <form id="enter" onSubmit={props.onEnter}>
            <div className="form-group">
                <label htmlFor="firstPlayer">First Player Name (X):</label>
                <input
                    id="firstPlayer"
                    type="text"
                    value={props.firstPlayerName}
                    onChange={(event) => {props.setFirstPlayerName(event.currentTarget.value)}}
                    data-testid="firstPlayer" />
            </div>

            <div className="form-group">
                <label htmlFor="secondPlayer">Second Player Name (O):</label>
                <input
                    id="secondPlayer"
                    type="text"
                    value={props.secondPlayerName}
                    onChange={(event) => {props.setSecondPlayerName(event.currentTarget.value)}}
                    data-testid="secondPlayer" />
            </div>

            <div className="form-group">
                <input id="enter" type="submit" value="Enter" data-testid="submit" />
            </div>
        </form>
    );
}

export default EnterForm;