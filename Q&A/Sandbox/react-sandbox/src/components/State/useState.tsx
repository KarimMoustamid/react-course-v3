import type React from "react";
import { useEffect, useState } from "react";
import "./useState.css";

const UseStateDemo = () => {
  const [counter, setupCounter] = useState(0);

  useEffect(() => {
    console.log("Counter updated");
  }, []);

  const onButtonClick = (value: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked", value);
    if (counter >= 10) {
      setupCounter(0);
    } else {
      setupCounter((prevCounter) => prevCounter + 1);
    }
  };

  const resetCounter = () => {
    setupCounter(0);
  };

  return (
    <div className="useState-container">
      <div className="useState-card">
        <h1 className="useState-title">useState Demo</h1>
        <div className="counter-display">
          <span className="counter-label">Counter:</span>
          <span
            className={`counter-value ${counter > 5 ? "counter-high" : ""}`}
          >
            {counter}
          </span>
        </div>
        <div className="button-group">
          <button
            className="primary-button"
            onClick={onButtonClick}
            disabled={false}
          >
            {counter > 10 ? "Reset to 0" : "Increment"}
          </button>
          <button className="secondary-button" onClick={resetCounter}>
            Reset
          </button>
        </div>
        {counter >= 10 && (
          <div className="counter-message">
            🎉 Counter exceeded 10! Next click will reset.
          </div>
        )}
      </div>
    </div>
  );
};

export default UseStateDemo;
