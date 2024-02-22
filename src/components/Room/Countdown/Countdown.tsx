import {useEffect, useState} from "react";
import {ICountdownProps} from "./ICountdownProps";
import GameActionButton from "../../GameActionButton/GameActionButton";

function Countdown(props: ICountdownProps) {
    const [count, setCount] = useState(3);
    const [startCountdown, setStartCountdown] = useState(false);

    useEffect(() => {
        let countdownInterval: NodeJS.Timeout;

        if (startCountdown) {
            countdownInterval = setInterval(() => {
                if (!props.stopCountdown) {
                    if (count > 1) {
                        setCount(count - 1);
                    } else {
                        clearInterval(countdownInterval);
                        props.doAfterCountdown();
                        // Perform any action when the countdown reaches zero
                    }
                }
            }, 1000);
        }

        return () => clearInterval(countdownInterval);
    }, [count, startCountdown, props]);

    const handleStartCountdown = () => {
        setStartCountdown(true);
    };

    return (
        <div className="text-white">
            {startCountdown ? <h1>{count}</h1> :
                <GameActionButton value="Start" onClick={handleStartCountdown}/>}
        </div>
    );
}

export default Countdown;