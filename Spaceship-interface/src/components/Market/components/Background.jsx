import React from "react";
import styled from "styled-components";
import bg from "./img/main.jpeg";
import Button from "./Button";

const Background = () => {
  return (
    <Block_container>
      <Featured>
        <Featured__title>
          <h1>Discover, collect, and sell extraordinary NFTs</h1>
          <p>Dark Sea is the world&apos;s first and largest <span>DARK</span> NFT marketplace</p>
          <Button_nav>
            <Button />
          </Button_nav>
        </Featured__title>
        <Featured__image>
          <Featured__container>
            <Image__featured src={bg}></Image__featured>
          </Featured__container>
          <Footer_featured>
            <Footer_ava>
              <img src={bg} alt="" />
            </Footer_ava>
            <Footer_title>
              <Footer_name>Horror Girl #014</Footer_name>
              <Footer_creator>SpaceK</Footer_creator>
            </Footer_title>
            <Footer_icon>icon</Footer_icon>
          </Footer_featured>
        </Featured__image>
      </Featured>
    </Block_container>
  );
};
const Block_container = styled.div`
  width: 100%;
  height: 586px;
`;
const Background_container = styled.div`
  height: 780px;
  opacity: 0.3;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  -webkit-mask: linear-gradient(rgb(255, 255, 255), transparent);
`;
const Featured = styled.div`
  margin: 0px auto;
  max-width: min(1280px, 100% - 40px);
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Featured__title = styled.div`
  width: 50%;
  padding: 110px 20px 44px 30px;
  align-items: flex-start;
  h1 {
    font-size: 45px;
    color: #d02715;
  }
  p {
    font-size: 18px;
    padding-bottom: 30px;
    span {
      color: #d02715;
    }
  }
`;

const Featured__image = styled.div`
  max-width: 550px;
  background-color: rgb(251, 253, 255);
  color: black;
  flex-direction: column;
  border-radius: 10px;
  z-index: 2;
  box-shadow: rgb(171 171 171 / 25%) 0px 0px 10px 0px;
  &:hover {
    transition: box-shadow 0.3s ease 0s;
    box-shadow: rgb(171 171 171 / 25%) 0px 0px 50px 0px;
  }
`;
const Featured__container = styled.div`
  width: 420px;
  overflow: hidden;
  align-items: center;
  display: flex;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
`;
const Image__featured = styled.img`
  object-fit: cover;
  width: 100%;
  height: 420px;
`;
const Footer_featured = styled.div`
  width: 100%;
  font-weight: 600;
  padding: 16px;
  color: rgb(53, 56, 64);
  text-align: left;
  display: flex;
  flex-direction: row;
`;
const Footer_ava = styled.div`
  align-self: center;
  order: 2;
  margin-right: 16px;
  flex-shrink: 0;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const Footer_title = styled.div`
  display: flex;
  align-self: stretch;
  flex: 1 1 auto;
  flex-flow: column;
  -webkit-box-pack: center;
  justify-content: center;
  margin-right: 16px;
  order: 3;
  overflow: hidden;
  font-size: 16px;
  align-items: flex-start;
`;
const Footer_name = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: rgb(4, 17, 29);
`;
const Footer_creator = styled.span`
  font-weight: 500;
  font-size: 14px;
  rgb(32, 129, 226);
`;
const Footer_icon = styled.div`
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-flow: column;
  -webkit-box-pack: center;
  justify-content: center;
  max-width: 40%;
  order: 4;
  overflow: hidden;
  text-align: right;
`;
const Button_nav = styled.div``;

export default React.useMemo(Background);
