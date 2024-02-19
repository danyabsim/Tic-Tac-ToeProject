import React from "react";
import {IRoomCodeProps} from "./IRoomCodeProps";

function RoomCode(props: IRoomCodeProps)
{
    return (
        <>
            <label className="block mb-2">Room Code:</label>
            <input
                className="inline-block mt-4 mb-4 text-center text-black" type="text" value={props.roomCode}
                onChange={(event) => props.setRoomCode(event.currentTarget.value)}
                data-testid="codeRoom"
            />
        </>
    );
}

export default RoomCode;