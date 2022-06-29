import React from "react";
import styled from "styled-components";

const Exit = () => {
  return (
    <Exits>
      <img src="https://app.flybylaunchpad.com/exit.png" alt="Exit" />
    </Exits>
  );
};
const Exits = styled.div`
    img {
        width: 100%;
    }
`;
export default Exit;