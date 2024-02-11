import React from "react";

export function getMarginStyle(solvedChar: string, firstPlayerSign: string, secondPlayerSign: string) {
    return {
        marginLeft: solvedChar === firstPlayerSign ? '0' : 'auto',
        marginRight: solvedChar === secondPlayerSign ? '0' : 'auto',
    };
}

export function overlayStyles(): React.CSSProperties {
    return {
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
}

export function contentStyles(solvedChar: string, firstPlayerSign: string, secondPlayerSign: string): React.CSSProperties {
    return {
        width: '500px',
        height: '300px',
        backgroundSize: 'cover',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('https://i.pinimg.com/originals/e4/d2/c1/e4d2c1d0da356797359acd9270bcdd77.gif')`,
        // Add more styles as needed
        ...getMarginStyle(solvedChar, firstPlayerSign, secondPlayerSign), // Apply margin style here
    };
}