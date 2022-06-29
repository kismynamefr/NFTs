import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import Nav from "../../Nav";
import SideMenu from "../../Market/components/SideMenu";
import ContainItem from "./ContainItem";
import ModalBox from "./ModalBox";
import { useLocation } from "react-router";

const Detailbox = () => {
  const location = useLocation();
  const [openBox, setOpenBox] = useState(false);
  const [dataBox, setDataBox] = useState(
    location.state ? location.state : undefined
  );

  const handleOpenBox = () => {
    return setOpenBox(true);
  };

  useEffect(() => {
    return () => {
      setDataBox([]);
    };
  }, []);

  return (
    <DetailBox>
      <TopBox>
        <NameBox>{dataBox.name}</NameBox>
        <ImgBox>
          <img src={dataBox.url} />
        </ImgBox>
        <ButtonBox onClick={handleOpenBox}>Open Box</ButtonBox>
      </TopBox>
      <ModalBox
        objectItem={dataBox}
        openBox={openBox}
        setOpenBox={setOpenBox}
      />
      <BottomBox>
        <HeaderBox>Box Contains</HeaderBox>
        <ContainBox>
          <ContainItem dataBox={dataBox} />
        </ContainBox>
      </BottomBox>
    </DetailBox>
  );
};

const DetailBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media only screen and (max-width: 1700px) {
    flex-direction: column;
    gap: 2rem;
  }
  @media only screen and (max-width: 935px) {
    padding: 16px;
  }
  @media only screen and (max-width: 500px) {
    padding: 10px;
  }
`;
const TopBox = styled.div`
  text-align: center;
  width: 40%;
  position: relative;
  overflex: hidden;
  &::before {
    content: "";
    position: absolute;
    background: url("https://app.forbitswap.com/images/all-background/star-staking-dark.png")
      center center / cover no-repeat;
    animation: 15s linear 0s infinite normal none running zoomOut;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: -1;
    @keyframes zoomOut {
      0% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(1.2);
      }
    }
  }
  @media only screen and (max-width: 1700px) {
    width: 100%;
  }
`;
const NameBox = styled.div`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const ImgBox = styled.div`
  margin-bottom: 15px;
  img {
    width: 250px;
    height: 100%;
  }
  @media only screen and (max-width: 500px) {
    img {
      width: 160px;
    }
    font-size: 20px;
  }
`;
const ButtonBox = styled.button`
  padding: 10px 40px;
  border-radius: 10px;
  font-size: 16px;
  color: white;
  border: none;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  background-position: center right;
  background-size: 100%;
  transition: all 0.5s ease-in-out 0s;
  cursor: pointer;
  &:hover {
    background-size: 200%;
    background-position: left center;
  }
  @media only screen and (max-width: 500px) {
    padding: 7px 20px;
    font-size: 13px;
    border-radius: 6px;
  }
`;
const BottomBox = styled.div`
  width: 60%;
  padding: 2rem;
  min-height: 50rem;
  border: 2px solid #757575;
  border-radius: 10px;
  height: 100%;
  background: linear-gradient(
    117.45deg,
    rgba(255, 255, 255, 0) -3.91%,
    rgba(255, 255, 255, 0.039) 75.27%
  );
  backdrop-filter: blur(42px);
  @media only screen and (max-width: 1700px) {
    width: 100%;
    min-height: auto;
  }
  @media only screen and (max-width: 935px) {
    padding: 16px;
  }
  @media only screen and (max-width: 500px) {
    padding: 10px;
  }
`;
const HeaderBox = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  margin-bottom: 2rem;
  text-align: center;
  @media only screen and (max-width: 935px) {
    margin-bottom: 16px;
  }
  @media only screen and (max-width: 500px) {
    margin-bottom: 10px;
    font-size: 16px;
  }
`;
const ContainBox = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  @media only screen and (max-width: 575px) {
    justify-content: center;
  }
`;

export default memo(Detailbox);
