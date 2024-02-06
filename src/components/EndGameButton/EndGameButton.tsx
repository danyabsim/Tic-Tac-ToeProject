import './EndGameButtonStyle.css';

function EndGameButton() {
    return (
        <div>
            <form id="endGameButton">
                <input type="submit" className="form-group" id="exit" onClick={() => window.location.reload()} value="Exit" />
            </form>
        </div>
    );
}

export default EndGameButton;