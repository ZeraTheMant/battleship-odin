import React, { useState, useEffect } from "react";

const EndScreen = (props) => {
    
    const renderEndScreen = () => {

        let text = "YOU LOSE!";
        if (props.playerWinner) text = "YOU WIN!"; 
        return ( <div id="inner-div"><h1>{text}</h1></div> );
    }
    
    const getClasses = () => {
        if (props.gameOngoing) {
            return 'hidden';
        } else {
            return 'show'
        }
    }
    
    return (
        <div id="end-screen-div" className={getClasses()}>
            {renderEndScreen()}
        </div>
    )
}

export default EndScreen;