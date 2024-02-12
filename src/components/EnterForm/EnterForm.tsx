import React, {ChangeEvent, useEffect} from "react";
import {EnterFormProps} from "./EnterFormProps";
import './EnterFormStyle.css';
import {exportHistoryToFile} from "../../redux/historySlice";
import {useDispatch} from "react-redux";

function EnterForm(props: EnterFormProps) {
    const maxLengthOfSigns = 1;
    const dispatch = useDispatch();

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Your logic here, for example, show a confirmation message
            const confirmationMessage = 'Are you sure you want to reload the page?';
            event.returnValue = confirmationMessage; // Standard for most browsers
            dispatch(exportHistoryToFile());
            return confirmationMessage; // For some older browsers
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dispatch]);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>, where: string) {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            if (where === "first") {
                props.setSelectedFirstPlayerFile(file);
            } else {
                props.setSelectedSecondPlayerFile(file);
            }

            // Read the content of the file as a data URL
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    if (where === "first") {
                        props.setFileFirstPlayerURL(e.target.result.toString());
                    } else {
                        props.setFileSecondPlayerURL(e.target.result.toString());
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function handleFirstPlayerFileChange(event: ChangeEvent<HTMLInputElement>) {
        handleFileChange(event, "first");
    }

    function handleSecondPlayerFileChange(event: ChangeEvent<HTMLInputElement>) {
        handleFileChange(event, "second");
    }

    return (
        <form id="enter" onSubmit={props.onEnter}>
            <div className="form-group">
                <label htmlFor="firstPlayerName">First Player Name:</label>
                <input
                    id="firstPlayerName"
                    type="text"
                    value={props.firstPlayerName}
                    onChange={(event) => {
                        props.setFirstPlayerName(event.currentTarget.value)
                    }}
                    data-testid="firstPlayerName"/>
                <label htmlFor="firstPlayerSign">First Player Sign:</label>
                <input
                    id="firstPlayerSign"
                    type="text"
                    value={props.firstPlayerSign}
                    onChange={(event) => {
                        props.setFirstPlayerSign(event.currentTarget.value)
                    }}
                    maxLength={maxLengthOfSigns}
                    data-testid="firstPlayerSign"/>
                <input type="file" onChange={handleFirstPlayerFileChange} accept="image/*"/>
            </div>

            <div className="form-group">
                <label htmlFor="secondPlayerName">Second Player Name:</label>
                <input
                    id="secondPlayerName"
                    type="text"
                    value={props.secondPlayerName}
                    onChange={(event) => {
                        props.setSecondPlayerName(event.currentTarget.value)
                    }}
                    data-testid="secondPlayerName"/>
                <label htmlFor="secondPlayerSign">Second Player Sign:</label>
                <input
                    id="secondPlayerSign"
                    type="text"
                    value={props.secondPlayerSign}
                    onChange={(event) => {
                        props.setSecondPlayerSign(event.currentTarget.value)
                    }}
                    maxLength={maxLengthOfSigns}
                    data-testid="secondPlayerSign"/>
                <input type="file" onChange={handleSecondPlayerFileChange} accept="image/*"/>
            </div>

            <div className="form-group">
                <input id="enter" type="submit" value="Enter" data-testid="submit"/>
            </div>
        </form>
    );
}

export default EnterForm;