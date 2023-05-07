import React, { useState } from 'react'

function CountingTrackerItem(props) {

    const [count, setCount] = useState(0);

    return (
        <div className="item incrementing tracker-group">
            <div className="incrementor">
                <div  className="increment-controls" onClick={() => setCount(count - 1)}>-</div>
                <div  className="magicite" onClick={() => setCount(count + 1)}>{count}</div>
                <div  className="increment-controls" onClick={() => setCount(count + 1)}>+</div>
            </div>
        </div>
    )
}

export default CountingTrackerItem