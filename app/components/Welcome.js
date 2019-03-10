import React from 'react';

const Welcome = props => {
  return (
    <div id="welcomeContainer">
      <h1>FroNotes</h1>
      <div className="logo">
        <img src="./img/line-only.png" />
      </div>
      <div id="welcome-notes">
        <p>Ctrl+O to Open note</p>
        <p>or</p>
        <p>Click "new" to start a new note</p>
      </div>
    </div>
  );
};

export default Welcome;
