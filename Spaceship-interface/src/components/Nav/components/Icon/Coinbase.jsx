import React from "react";
import coinbases from "../../logo/coinbase.png";
import styled from "styled-components";

const Coinbase = () => {
  return (
    <Logo>
      <Icon></Icon>
    </Logo>
  );
};

const Logo = styled.div`
  width: 50px;
`;
const Icon = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${coinbases});
  background-repeat: none;
  background-size: cover;
  @media only screen and (max-width: 500px) {
    & {
      width: 45px;
      height: 45px;
    }
  }
`;

export default React.memo(Coinbase);
