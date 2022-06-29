import React from "react";
import styled from "styled-components";
import stars from "./star.png";

const Star = () => {
  return (
    <Star_main>
      <img src={stars} alt="" />
    </Star_main>
  );
};
const Star_main = styled.div`
  width: 100%;
  img {
    width: 20px !important;
    height: 20px;
  }
  @media only screen and (max-width: 500px) {
    img {
      width: 15px !important;
      height: 15px;
    }
  }
`;
export default Star;
