import React, { useState } from 'react'
import ClickableTrackerItem from '../clickableTrackerItem'

function TrackerItemGrouping(props) {

    const [availabilityState, setAvailability] = useState(props.groupIcon.itemAvailability[0] === "always")

        return (
            <div className={"tracker-group" + (availabilityState ? " available" : " unavailable")}>
            {(props.showGroup === undefined || props.showGroup) &&
                <div className="group-item">
                    <div></div>
                    <div onClick={() => {setAvailability(props.groupIcon.itemAvailability[0] === "always" || (!availabilityState))}}>
                    <ClickableTrackerItem
                        itemIcon={props.groupIcon.itemIcon}
                        itemName={props.groupIcon.itemName}
                        itemClickStates={props.groupIcon.itemClickStates}
                        itemCurrentClickState={0}
                        itemAvailability={props.groupIcon.itemAvailability}                        
                    />
                    </div>
                    <div></div>
                </div>
            }
                <div className={"tracker-group-items"}>
                        {props.groupedItems.map((item, i) =>
                            <ClickableTrackerItem
                                key={i}
                                itemIcon={item.itemIcon}
                                itemName={item.itemName}
                                itemClickStates={item.itemClickStates}
                                itemCurrentClickState={0}
                                itemAvailability={item.itemAvailability}
                                itemXsize={item.Xsize === undefined ? 1 : item.Xsize}                                
                                itemYsize={item.Ysize === undefined ? 1 : item.Ysize}
                            />
                        )}
                </div>
            </div>
        )
}

export default TrackerItemGrouping