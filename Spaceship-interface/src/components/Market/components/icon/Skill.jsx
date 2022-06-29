import React from "react";
import styled from "styled-components";
import heart from "../img/Vector3.png";
import box5 from "../img/box5.png";

const Heart = () => {
  return (
    <>
      <BoxHeart>
        <img src={box5} alt="" />
        <Hearts>
          <img src={heart} alt="" />
        </Hearts>
      </BoxHeart>
    </>
  );
};
const BoxHeart = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  & > img {
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 500px) {
    width: 38px;
    height: 38px;
    & > img {
      width: 38px;
      height: 38px;
    }
  }
`;
const Hearts = styled.div`
  position: absolute;
  left: 50%;
  top: 47%;
  height: 20px;
  transform: translate(-50%, -50%);
  z-index: 1;
  img {
    width: 20px;
    height: 100%;
  }
  @media only screen and (max-width: 500px) {
    height: auto;
    top: 51%;
    img {
      width: 14px;
    }
  }
`;
export default Heart;
