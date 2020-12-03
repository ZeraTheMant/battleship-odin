import React, { useState } from "react";

const ShipContainer = (props) => {   
    const dragStart = (e) => {
        if (props.num > 0 && !props.randomizePlayerShips) {
           props.draggedShipSetup(e.target); 
        } else {
           props.draggedShipSetup(null);
        }
    }
      
    const getDraggedShipLength = (ship) => ship.children.length;

    const createShipBlocks = (blocks) => {
        const loopArr = Array(blocks).fill('');
        return loopArr.map((step, move) => {
            return (
                <div className={['ship-block', 'ship'].join(' ')}></div>
            )
        });
    };
    
    return (
        <div className="ship-container">
            <div>{props.num + 'x'}</div>
            <div 
                className={props.class_name} 
                draggable={true}
                onDragStart={dragStart}
            >
                {createShipBlocks(props.blocks)}
            </div>
        </div>  
    );
};

export default ShipContainer;