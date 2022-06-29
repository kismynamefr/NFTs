import React from "react";
import styled from "styled-components";

const SwitchNetwork = () => {
  return (
    <Switch>
      <img src="https://app.flybylaunchpad.com/static/media/button.53504d24.png" alt="Switch Network" />
    </Switch>
  );
};
const Switch = styled.div`
  display: block;
  text-align: center;
  img {
    max-width: 100%;
  }
`;
export default SwitchNetwork;
