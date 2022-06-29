import React, { memo } from "react";
import styled from "styled-components";

const Eye = ({ href }) => {
  return (
    <Eyes>
      <a href={href} target="_blank" rel="noreferrer">
        <img src="https://app.flybylaunchpad.com/eye.png" alt="Eye" />
      </a>
      <EyeText className="text">View on Explorer</EyeText>
    </Eyes>
  );
};
const Eyes = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  img {
    background-color: rgba(0, 10, 77, 0.23);
    border-radius: 8px;
    padding: 5px 6px;
    display: block;
    cursor: pointer;
    width: 38px;
    height: 22px;
    transition: all 0.5s ease-in-out 0s;
  }
  @media only screen and (max-width: 500px) {
    & img {
      width: 30px;
      height: 20px;
    }
  }
  img:hover {
    background-color: transparent;
  }
  &:hover .text {
    display: block;
    transition: all 0.5s ease-in-out 0s;
  }
`;
const EyeText = styled.div`
  font-size: 12px;
  margin-left: 5px;
  padding: 0 6px 0 3px;
  font-style: italic;
  background-color: rgba(0, 10, 77, 0.23);
  border-radius: 6px;
  display: none;
  transition: all 0.5s ease-in-out 0s;
`;
export default memo(Eye);
