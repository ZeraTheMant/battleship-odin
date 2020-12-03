import React, { useState } from "react";

const Square = (props) => {
    return (
        <div 
            className={props.classNames}
            onDragOver={(e) => props.onDragOver(e)}
            onDragEnter={(e) => props.onDragEnter(e)}
            onDragLeave={(e) => props.onDragLeave(e)}
            onDrop={(e) => props.onDrop(e)}
            onClick={(e) => props.onClick(e)}
        >
            {props.value}
        </div>
    )
}

export default Square;