import React from "react";
import styled from "styled-components";
import "./css/Spinner.css";

const Spinner = () => {
  return (
      <div className="spinner">
        <div className="arc"></div>
        <div className="arc"></div>
        <div className="arc"></div>
      </div>
  );
};

export default Spinner;
