import master from "../img/mastercard.png";
import React from "react";
import styled from "styled-components";

const Master = () => {
  return (
    <Card>
        <img src={master} alt="mastercard" />
    </Card>
  );
};

const Card = styled.div`
  width: 50px;
`;

export default React.memo(Master);
