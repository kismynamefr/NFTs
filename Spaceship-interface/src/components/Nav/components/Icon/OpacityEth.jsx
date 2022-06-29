import React, { memo } from "react";
import styled from "styled-components";
import SwitchNetwork from "./SwitchNetwork";
import BNBChain from "./BNBChain";
import Ethereum from "./Ethereum";

const OpacityEth = ({ isOpen, setOpenChangeNetwork, handleChangeNetwork }) => {
  const closeChangeNetwork = () => {
    return setOpenChangeNetwork(false);
  };
  return (
    <>
      {isOpen ? (
        <>
          <Opacity  />
          <Ethe onClick={closeChangeNetwork}>
            <ContainerEth>
              <BodyEth>
                <SwitchNetwork />
                <ImgList>
                  <ImgItems
                    className="bnb"
                    onClick={() => {
                      handleChangeNetwork("97");
                    }}
                  >
                    <Item>
                      <BNBChain width={45} height={45} />
                      <BNB className="bnb-text">BNB Chain</BNB>
                    </Item>
                    <ItemRes>
                      <BNBChain width={32} height={32} />
                      <BNBRes className="bnbres-text">BNB Chain</BNBRes>
                    </ItemRes>
                  </ImgItems>
                  <ImgItems
                    className="ethe"
                    onClick={() => {
                      handleChangeNetwork("3");
                    }}
                  >
                    <Item>
                      <Ethereum width={45} height={45} />
                      <BNB className="bnb-text">Ethereum</BNB>
                    </Item>
                    <ItemRes>
                      <Ethereum width={32} height={32} />
                      <BNBRes className="bnbres-text">Ethereum</BNBRes>
                    </ItemRes>
                  </ImgItems>
                </ImgList>
              </BodyEth>
            </ContainerEth>
          </Ethe>
        </>
      ) : null}
    </>
  );
};
const Opacity = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 1;
  opacity: 8;
  transition: opacity 0.3s ease-in-out 0s;
  background-color: rgba(0, 0, 0, 0.35);
`;
const Ethe = styled.div`
  position: absolute;
  inset: 0px;
  z-index: 10;
  height: 100vh;
`;
const ContainerEth = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 440px;
  width: 100%;
  height: fix-content;
  border-radius: 22px;
  background: linear-gradient(to left,rgb(0,4,254),rgb(0,195,254)) rgb(0,20,38);
  background-size: cover;
  background-position: center center;
  z-index: 10;
  @media only screen and (max-width: 500px) {
    & {
      max-width: 300px;
    }
  }
`;
const BodyEth = styled.div`
  position: relative;
  width: 100%;
  padding: 16px 20px;
`;
const ImgList = styled.div`
  animation: 2s ease 0s 1 normal none running turn;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  @keyframes turn {
    0% {
      transform: rotate(-360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;
const ImgItems = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  gap: 3px;
  &.bnb {
    left: 19%;
    top: 18%;
  }
  &.ethe {
    left: 69%;
    top: 69%;
  }
  @media only screen and (max-width: 500px) {
    & p {
      font-size: 12px;
    }
    &.ethe {
      left: 63%;
      top: 69%;
    }
  }
`;
const Item = styled.div`
  position: relative;
  &:hover .bnb-text {
    max-width: 200px;
    width: 100px;
    text-align: center;
  }
  @media only screen and (max-width: 500px) {
    & {
      display: none;
    }
  }
`;
const BNB = styled.div`
  max-width: 0px;
  overflow: hidden; 
  transition: all 0.4s ease-in-out 0s;
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;
const ItemRes = styled.div`
  display: none;
  position: relative;
  &:hover .bnbres-text {
    max-width: 200px;
    width: 100px;
    text-align: center;
  }
  @media only screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`;
const BNBRes = styled.div`
  max-width: 0px;
  overflow: hidden; 
  transition: all 0.4s ease-in-out 0s;
  position: absolute;
  font-size: 13px;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

export default memo(OpacityEth);