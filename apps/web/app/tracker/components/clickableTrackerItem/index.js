import React, { useState } from 'react'

function ClickableTrackerItem(props) {

    const [stateIndex, setStateIndex] = useState(0);

    var itemAvailability = props.itemAvailability
    if(props.itemAvailability == null) {
        itemAvailability = []
    }


    var itemClass = "item"
    if (props.itemClickStates[0].includes("key")) {
        itemClass = "key"
    } 

    return (
        <div className={itemClass} onClick={() => {
            setStateIndex(((stateIndex + 1) % props.itemClickStates.length))
            if (props.itemAvailability.indexOf("character") === -1) {
                return
            }
            }} >
            <img 
                className={"item-image " + props.itemClickStates[stateIndex] + " " + itemAvailability.join(" ")} 
                src={Array.isArray(props.itemIcon) ? props.itemIcon[stateIndex] : props.itemIcon} 
                title={props.itemName} 
                alt={props.itemName} />
        </div>
    )
}

export default ClickableTrackerItem