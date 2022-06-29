import React, {useState} from "react";
import styled from "styled-components";

const Copy = () => {

  return (
    <Copys>
      <img src="https://app.flybylaunchpad.com/copy.png" alt="Copy"/>
      <CopyText className='text'>Copied</CopyText>
    </Copys>
  );
};
const Copys = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.5s ease-in-out 0s;
  img {
    cursor: pointer;
    width: 17px;
    height: 18px;
  }
`;

const CopyText = styled.div`
  font-size: 12px;
  margin-left: 5px;
  padding: 0 6px 0 3px;
  font-style: italic;
  background-color: rgba(0, 10, 77, 0.23);
  border-radius: 6px;
  visibility: hidden;
`;

export default Copy;