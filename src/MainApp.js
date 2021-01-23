import React from 'react';
import Controls from './sections/controls.jsx';

function MainApp() {

  return (
    <div className="container">
      <div className="blueBar">
        <div className="inputs">
          <div className="title">
            QuickSort
          </div>
            <Controls/>
        </div>
      </div>
      <div className="mainScreen">
        a
      </div>
    </div>
  );
}

export default MainApp;
