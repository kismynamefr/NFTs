import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Home from "../../../Market/components/icon/Home";
import Marketplace from "../../../Market/components/icon/Marketplace";
import User from "../../../Market/components/icon/User";
import Credit from "../../../Market/components/icon/Crate";
import Setting from "../../../Market/components/icon/Setting";
import Fobitlogo from "../../logo/SpaceAstronaut.png";
import Ethereum from "./Ethereum";
import BNBChain from "./BNBChain";

const SideMenu = ({ setOpenMenu }) => {
  const handleClosedMenu = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <OpacityMenu onClick={handleClosedMenu} />
      <MenuSide>
        <Body>
          <Logo>
            <img className="logoDesktop" src={`${Fobitlogo}`} alt="" />
          </Logo>
          <SideMenuItem>
            <SideMenuLink>
              <Home />
              <Link to="/" data-item="Home">
                Home
              </Link>
            </SideMenuLink>
          </SideMenuItem>
          <SideMenuItem>
            <SideMenuLink>
              <Marketplace />
              <Link to="/Markets" data-item="Marketplace">
                Marketplace
              </Link>
            </SideMenuLink>
          </SideMenuItem>
          <SideMenuItem>
            <SideMenuLink>
              <User />
              <Link to="/Users" data-item="Users">
                Users
              </Link>
            </SideMenuLink>
          </SideMenuItem>
          <SideMenuItem>
            <SideMenuLink>
              <Credit />
              <Link to="/Crates" data-item="Crates">
                Crates
              </Link>
            </SideMenuLink>
          </SideMenuItem>
          <SideMenuItem>
            <SideMenuLink>
              <Setting />
              <Link to="/" data-item="Settings">
                Settings
              </Link>
            </SideMenuLink>
          </SideMenuItem>
          <Network>
            <NetworkTitle>Supported networks</NetworkTitle>
            <NetworkList>
              <SideMenuItem>
                <SideMenuLink>
                  <Ethereum width={22} height={22} />
                  <Link to="/" data-item="Ethereum">
                    Ethereum
                  </Link>
                </SideMenuLink>
              </SideMenuItem>
              <SideMenuItem>
                <SideMenuLink>
                  <BNBChain width={22} height={22} />
                  <Link to="/" data-item="BNBChain">
                    BNBChain
                  </Link>
                </SideMenuLink>
              </SideMenuItem>
            </NetworkList>
          </Network>
        </Body>
      </MenuSide>
    </>
  );
};

const OpacityMenu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 48;
  background-color: rgba(0, 0, 0, 0.35);
`;
const MenuSide = styled.div`
  display: flex;
  height: 100vh;
  position: absolute;
  padding: 20px;
  min-width: 280px;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  box-shadow: 8px 8px 24px 0px #3b817dcf;
  top: 0;
  left: 0;
  z-index: 50;
  overflow: scroll;
  animation: MenuLeft 0.7s ease-in-out;
  @keyframes MenuLeft {
    from {
      transform: translateX(-500px);
    }
    to {
      transform: translateX(0);
    }
  }
`;
const Body = styled.div`
  height: 100%
  display: flex;
  flex-flow: column;
  gap: 15px;
  div {
    cursor: pointer;
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    height: 50px;
  }
`;
const SideMenuItem = styled.div`
  position: relative;
  transition: all 0.5s ease-in-out 0s;
  font-family: Montserrat, sans-serif;
  font-style: italic;
  a {
    margin-left: 10px;
    color: white;
    text-decoration: none;
    position: relative;
    &::before {
      content: attr(data-item);
      transition: all 0.5s ease-in-out 0s;
      color: rgb(20 235 212);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 0;
      overflow: hidden;
    }
  }
  &:hover {
    transform: scale(1.1);
    a {
      transition: all 0.5s ease-in-out 0s;
      color: rgb(37, 255, 44);
      &::before {
        width: 100%;
      }
    }
  }
  &:hover > #icon-union {
    visibility: visible;
  }
`;
const SideMenuLink = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const Network = styled.div``;
const NetworkTitle = styled.div`
  padding: 10px 0;
  margin-bottom: 5px;
`;
const NetworkList = styled.div`
  padding-left: 20px;
`;

export default React.memo(SideMenu);
