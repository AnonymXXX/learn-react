import React from "react";
import "./Heart.css";

const Heart = () => {
  return (
    <div className="heart-container">
      <div className="heart">
        <span className="left">&hearts;</span>
        <span className="right">&hearts;</span>
      </div>
    </div>
  );
};

export default Heart;
