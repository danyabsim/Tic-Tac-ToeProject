import React, {HTMLProps, useState} from "react";
import ToolTip from "./Tooltip/ToolTip";

function GameActionButton(props: HTMLProps<HTMLInputElement>) {
    const [tooltipPosition, setTooltipPosition] = useState<{
        top: number;
        left: number;
    }>({top: 0, left: 0});
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`border-2 border-black ml-7 mr-7 mt-2 mb-2 inline-block p-2 rounded-full text-black ${props.className} ${props.className ? '' : isHovered ? 'bg-green-400' : 'bg-green-500'}`}>
            {isHovered && <ToolTip text={props.value as string} position={tooltipPosition}/>}
            <input className={`cursor-pointer`} type={`${props.type ? props.type : 'button'}`} value={props.value}
                   onClick={props.onClick}
                   onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                   onMouseMove={(event) => setTooltipPosition({top: event.clientY, left: event.clientX})}
            />
        </div>
    );
}

export default GameActionButton;