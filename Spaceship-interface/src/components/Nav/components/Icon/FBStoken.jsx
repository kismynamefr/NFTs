import React from "react";
import styled from "styled-components";

const FBStoken = ({ height, width }) => {
  return (
    <EtherMain>
      <img
        style={{ height: height, width: width }}
        src="https://app.forbitswap.com/images/logo/logo-fbs.png"
        alt=""
      />
    </EtherMain>
  );
};
const EtherMain = styled.div`
  display: flex;
  align-items: center;
`;
export default FBStoken;
