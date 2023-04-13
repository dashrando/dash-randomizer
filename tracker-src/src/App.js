import React from 'react';
import './App.css';
import './tracker.css';
import TrackerItemGrouping from './components/trackerItemGrouping'
import trackerJson from './checks'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        
        <h2>Super Metroid: Recall</h2>
        <div className="groups">
          {
            trackerJson.map((group, i) =>
              <TrackerItemGrouping
                groupIcon={group.groupIcon}
                groupedItems={group.groupedItems}
              />
            )
          }
        </div>
      </header>     
    </div>
  );
}

export default App;
