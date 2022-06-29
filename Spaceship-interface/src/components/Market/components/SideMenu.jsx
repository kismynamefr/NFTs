import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { Link } from "react-router-dom";
import Home from "./icon/Home";
import Marketplace from "./icon/Marketplace";
import User from "./icon/User";
import Credit from "./icon/Crate";
import Setting from "./icon/Setting";
import Ethereum from "../../Nav/components/Icon/Ethereum";
import BNBChain from "../../Nav/components/Icon/BNBChain";
import { useWeb3React } from "@web3-react/core";

const SideMenu = () => {
  const { library } = useWeb3React();

  const handleChangeNetwork = async (chainId) => {
    switch (chainId) {
      case "3":
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x3" }],
        });
        break;
      case "97":
        try {
          await library.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x61" }],
          });
        } catch (switchError) {
          // 4902 error code indicates the chain is missing on the wallet
          if (switchError.code === 4902) {
            try {
              await library.provider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x61",
                    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
                    chainName: "Binance Smart Chain Testnet",
                    nativeCurrency: {
                      name: "BNB",
                      decimals: 18,
                      symbol: "tBNB",
                    },
                    blockExplorerUrls: ["https://testnet.bscscan.com"],
                  },
                ],
              });
            } catch (error) {
              console.error(error);
            }
          }
        }
        break;
      default:
        return null;
    }
  };

  return (
    <AccountSide>
      <Body>
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
            <SideMenuItem onClick={() => handleChangeNetwork("3")}>
              <SideMenuLink>
                <Ethereum width={22} height={22} />
                <a>Ethereum</a>
              </SideMenuLink>
            </SideMenuItem>
            <SideMenuItem onClick={() => handleChangeNetwork("97")}>
              <SideMenuLink>
                <BNBChain width={22} height={22} />
                <a>BNBChain</a>
              </SideMenuLink>
            </SideMenuItem>
          </NetworkList>
        </Network>
      </Body>
    </AccountSide>
  );
};

const AccountSide = styled.div`
  display: flex;
  min-width: 250px;
  padding-left: 2rem;
  @media only screen and (max-width: 1550px) {
    & {
      min-width: 200px;
    }
  }
  @media only screen and (max-width: 1040px) {
    & {
      display: none;
    }
  }
  @media only screen and (max-width: 1250px) {
    max-width: 200px;
  }
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 10px;
  div {
    cursor: pointer;
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
      color: rgb(0,195,254);
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
      color: rgb(0,195,254);
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
  padding: 10px;
`;
const Network = styled.div``;
const NetworkTitle = styled.div`
  padding: 10px 0;
  margin-bottom: 5px;
`;
const NetworkList = styled.div`
  padding-left: 20px;
`;

export default SideMenu;