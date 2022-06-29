import React from "react";
import styled from "styled-components";

const Popular = () => {
  return (
    <Main>
      <Inside>Popular</Inside>
    </Main>
  );
};

const Main = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: rgb(112, 122, 131);
`;
const Inside = styled.div`
  background-color: rgb(32, 129, 226);
  color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 4px 8px;
`;
export default React.memo(Popular);
