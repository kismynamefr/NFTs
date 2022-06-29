import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoadItems } from "../../Redux/action/actionFetch";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Ethereum from "../Nav/components/Icon/Ethereum";
import FBStoken from "../Nav/components/Icon/FBStoken";
import BNBChain from "../Nav/components/Icon/BNBChain";
import Skeletons from "./components/Skeletons";

const Home = () => {
  const data = useSelector((state) => state.fetchs.data);
  const dispatch = useDispatch();
  const isLoadding = useSelector((state) => state.fetchs.requesting);
  const { chainId } = useWeb3React();

  const checkedChainID = useCallback(() => {
    if (!chainId) return;
    return chainId === "3" ? (
      <Ethereum width={22} height={22} />
    ) : chainId === "97" ? (
      <BNBChain width={22} height={22} />
    ) : null;
  }, [chainId]);

  const isSkeletons = () => {
    return (
      <>
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
        <Skeletons />
      </>
    );
  };

  const mapItem = () => {
    return isLoadding
      ? isSkeletons()
      : data &&
          data.map((res, index) => {
            return (
              <ListMap key={index}>
                <Link
                  to={`/Markets/${res.serial}`}
                  state={res}
                  data-item="Detail"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <FeaturedImage>
                    <FeaturedContainer>
                      <ImageFeatured src={res.uri}></ImageFeatured>
                    </FeaturedContainer>
                    <FooterFeatured>
                      <FooterTitle>
                        <FooterName>{`${res.name} #${res.id}`}</FooterName>
                        <FooterCreator>Type Items: {res.type}</FooterCreator>
                      </FooterTitle>
                      <FooterPrice>
                        <Price>
                          <FBStoken width={25} height={25} />
                          {res.price}
                        </Price>
                      </FooterPrice>
                    </FooterFeatured>
                  </FeaturedImage>
                </Link>
              </ListMap>
            );
          });
  };

  useEffect(() => {
    if (!chainId) return;
    dispatch(LoadItems(chainId, 'false'));
  }, [chainId]);

  useEffect(() => {
    checkedChainID();
  }, [checkedChainID]);

  return (
    <SideItemContainer>
      <HeaderText>SPACESHIP</HeaderText>
      <SideItem>{mapItem()}</SideItem>
    </SideItemContainer>
  );
};

export const SideItem = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 30px;
  border-radius: 10px;
  &::-webkit-scrollbar {
    width: 0px;
  }
  overflow: scroll;
  height: 74vh;
  @media only screen and (max-width: 700px) {
    padding-top: 10px;
    gap: 20px;
  }
  @media only screen and (max-width: 531px) {
    justify-content: center;
  }
  @media only screen and (max-width: 500px) {
    height: 84vh;
  }
`;
export const SideItemContainer = styled.div`
  width: calc(100% - 250px);
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  @media only screen and (max-width: 935px) {
    & {
      width: 100%;
    }
  }
  @media only screen and (max-width: 1040px) {
    width: 100% !important;
  }
  @media only screen and (max-width: 1540px) {
    & {
      width: calc(100% - 200px);
    }
  }
  @media only screen and (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media only screen and (max-width: 500px) {
    padding: 0 10px 10px;
  }
`;
export const HeaderText = styled.div`
  display: flex;
  flex-basis: 100%;
  width: 100%;
  align-items: center;
  color: #03fbfe;
  margin: 10px 0px;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 5px;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 4px 3px rgb(0 0 0 / 40%), 0px 8px 13px rgb(0 0 0 / 10%),
    0px 18px 23px rgb(0 0 0 / 10%);
  font-family: Cambria;
  &:after {
    content: "";
    flex-grow: 1;
    background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
      rgb(0, 20, 38);
    height: 2px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 8px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 22px;
  }
`;
export const FeaturedImage = styled.div`
  width: 280px;
  color: white;
  border-radius: 10px;
  // box-shadow: 8px 8px 24px 0px rgb(0,195,254);
  cursor: pointer;
  flex-direction: column;
  position: relative;
  &:hover {
    box-shadow: 10px 10px 30px 0px rgb(0, 195, 254);
  }
  @media only screen and (max-width: 700px) {
    width: 240px;
    gap: 20px;
  }
`;
export const ListMap = styled.div``;
export const FeaturedContainer = styled.div`
  overflow: hidden;
  align-items: center;
  display: flex;
  position: relative;
  border-radius: inherit;
  height: 280px;
  @media only screen and (max-width: 700px) {
    height: 240px;
  }
`;
export const ImageFeatured = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export const FooterFeatured = styled.div`
  width: 100%;
  font-weight: 600;
  padding: 16px;
  color: inherit;
  text-align: left;
  display: flex;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    268.23deg,
    rgba(7, 253, 255, 0.5) -0.1%,
    rgba(15, 7, 255, 0.5) 99.94%
  );
  border-radius: 0 0 10px 10px;
  flex-direction: row;
`;
export const FooterTitle = styled.div`
  display: flex;
  align-self: stretch;
  width: 70%;
  flex-flow: column;
  justify-content: center;
  margin-right: 16px;
  overflow: hidden;
  font-size: 16px;
  @media only screen and (max-width: 1005px) {
    width: 75%;
  }
`;
export const FooterName = styled.span`
  color: inherit;
  font-weight: 500;
  font-size: 15px;
`;
export const FooterCreator = styled.span`
  color: inherit;
  font-size: 12px;
  letter-spacing: 0.1px;
  font-weight: 600;
  text-align: left;
`;
export const FooterPrice = styled.div`
  width: 30%;
  display: flex;
  align-items: flex-end;
  flex-flow: column;
  justify-content: center;
  span {
    font-weight: 400;
    font-size: 12px;
    color: inherit;
  }
  @media only screen and (max-width: 1005px) {
    width: 25%;
  }
`;
export const Price = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  font-size: 14px;
  align-items: center;
`;

export default React.memo(Home);
