// Import react-modal at the top of your file
import ReactModal from 'react-modal';
import {GameAlertProps} from "./GameAlertProps";
import './GameAlertStyle.css';

function GameAlert(props : GameAlertProps) {
    // const [modalIsOpen, setModalIsOpen] = useState(true);
    let alertText = "";

    // Function to close the modal and perform additional action
    const closeModalAndPerformAction = () => {
        props.setModalIsOpen(false);
        // if needed another code - do it here!
        console.log('User clicked OK');
    };

    return (
        <ReactModal
            isOpen={props.modalIsOpen}
            onRequestClose={closeModalAndPerformAction}
            contentLabel="Game Result"
        >
            <div className="form-group">
                <h2 id="alertText">{props.alertText}</h2>
                <button id="OKButton" onClick={closeModalAndPerformAction}>OK</button>
            </div>
        </ReactModal>
    );
}

export default GameAlert;