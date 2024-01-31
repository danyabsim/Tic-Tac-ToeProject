import React from 'react';
import BoardButton from "./BoardButton";

function Board() {
    return (
        <form id="board">
            <table>
                <tr>
                    <BoardButton id="XO11"/>
                    <BoardButton id="XO12"/>
                    <BoardButton id="XO13"/>
                </tr>
                <tr>
                    <BoardButton id="XO21"/>
                    <BoardButton id="XO22"/>
                    <BoardButton id="XO23"/>
                </tr>
                <tr>
                    <BoardButton id="XO31"/>
                    <BoardButton id="XO32"/>
                    <BoardButton id="XO33"/>
                </tr>
            </table>
        </form>
    );
}

export default Board;