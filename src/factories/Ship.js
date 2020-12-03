const Ship = (length) => {
    let statusBox = new Array(length).fill('o');
    let horizontalDisplay = true;
    let positions = [];
    let headPos;
    
    const getShipBodyPositions = (headPosition) => {
        let currentPos = headPosition; 
        const increment = (horizontalDisplay) ? 1 : 10; 
        let arr = [];
        
        for (let i=0; i<statusBox.length; i++) {
            arr.push(currentPos);
            currentPos += increment;
        }
        
        return arr;
    };
    
    const getPositions = () => positions;
    
    const getHeadPos = () => headPos;
    
    const getHorizontalDisplay = () => horizontalDisplay;
    
    const setPosition = (headPosition) => {
        headPos = headPosition;
        positions = getShipBodyPositions(headPos);
    }
    
    const getHitPosition = (position) => {
       return positions.indexOf(position);
    }
    
    const willGetHitAtPosition = (position) => {
        return positions.includes(position);
    };
    
    const switchDisplay = () => horizontalDisplay = !horizontalDisplay;
    
    const showStatusAtPos = (position) => statusBox[position];
    const isSunk = () => !statusBox.includes('o');
    const hit = (position) => statusBox[position] = 'x';
    
    return {
        getPositions,
        getHeadPos,
        length,
        getHorizontalDisplay,
        getHitPosition,
        setPosition,
        switchDisplay,
        willGetHitAtPosition,
        showStatusAtPos,
        hit,
        isSunk
    }
}

module.exports = Ship;