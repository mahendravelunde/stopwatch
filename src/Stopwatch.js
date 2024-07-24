import './stopwatch.css';
import React, { useState, useRef } from 'react';

const formatTime = (time) => {
  let minutes = String(Math.floor(time / 60000)).padStart(2, '0');
  let seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const startPause = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
    } else {
      const startTime = Date.now() - elapsedTime;
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
      setRunning(true);
    }
  };

  const stop = () => {
    clearInterval(timerRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setRunning(false);
  };

  const progress = (elapsedTime % 60000) / 60000 * 360; // Calculate progress as a degree

  return (
    <div className="stopwatch">
      <h2>Timer</h2>
      <div className="circular-progress">
        <div className="mask full" style={{ transform: `rotate(${progress}deg)` }}></div>
        <div className="mask half">
          <div className="fill" style={{ transform: `rotate(${progress > 180 ? progress - 180 : progress}deg)` }}></div>
        </div>
        <div className="inside-circle">{formatTime(elapsedTime)}</div>
      </div>
      <div className="buttons">
        <button id="start" onClick={startPause}>{running ? 'Pause' : 'Start'}</button>
        <button id="stop" onClick={stop}>Stop</button>
        <button id="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
