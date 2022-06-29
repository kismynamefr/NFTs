import React, { useState, useEffect, memo, useCallback } from "react";
import axios from "axios";
import useAPI from "../../API";
import avatar from "./img/avatar.png";
import styled from "styled-components";
import Pencil from "./component/Pencil";
import Twitter from "./component/Twitter";
import Facebook from "./component/Facebook";
import FBStoken from "../Nav/components/Icon/FBStoken";
import Instagram from "./component/Instagram";
import Skeletons from "../Market/components/Skeletons";
import { useWeb3React } from "@web3-react/core";
import {
  ListMap,
  FooterFeatured,
  FooterTitle,
  FooterPrice,
  Price,
  FooterName,
  FooterCreator,
  ImageFeatured,
} from "../Market/Market";

const Users = () => {
  const { account, chainId } = useWeb3React();
  const { API } = useAPI();
  const [NFTlist, setNFTlist] = useState([]);
  const [isSkeleton, setIsSkeleton] = useState(false);

  const flat = () => {
    const element = document.querySelector(".itemUser");

    element.addEventListener("wheel", (event) => {
      event.preventDefault();

      element.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    });
  };

  const fetchMyNFT = useCallback(async () => {
    setIsSkeleton(true);
    if (!chainId) return;
    await API(chainId).then(async (url) => {
      await axios({
        method: "get",
        url: `${url}/myNFTs/${account}`,
      }).then((res) => {
        const newRes = res.data.sort((a, b) => a.type.localeCompare(b.type));
        setNFTlist(newRes);
        setIsSkeleton(false);
      });
    });
  }, [chainId, account]);
  const isSkeletons = () => {
    return (
      <>
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
    return isSkeleton
      ? isSkeletons()
      : NFTlist.map((res) => {
          return (
            <ListMap key={res.id}>
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
                      <FBStoken width={18} height={18} />
                      {res.price}
                    </Price>
                  </FooterPrice>
                </FooterFeatured>
              </FeaturedImage>
            </ListMap>
          );
        });
  };

  useEffect(() => {
    fetchMyNFT();
    flat();
    return () => {
      setNFTlist([]);
    };
  }, [fetchMyNFT]);

  return (
    <SideItem>
      <TopItem>
        <AccountUser>
          <AvatarUser>
            <img src={avatar} alt="avatar" />
            <Update>{/* <Pencil width={21} height={21} /> */}</Update>
          </AvatarUser>
          <UserInfo>
            <UserName>Mark Johnson</UserName>
            <UserEmail>mark@gmail.com</UserEmail>
          </UserInfo>
        </AccountUser>
        <Balance>
          <p>Credit Balance</p>
          <h1>$25,251</h1>
        </Balance>
      </TopItem>
      <MiddleItem>
        <Dashboard>
          <Greeting>
            <h1>Welcome back</h1>
            <p>Nice to meet you, Mark Johnson</p>
          </Greeting>
        </Dashboard>
        <Profile>
          <ProfileHead>
            <h1>Profile Informations</h1>
            <ProfileDesc>
              Lorem ipsum dolor sit amit lorem ipsum dolor sit amit lorem ipsum
              dolor sit amit
            </ProfileDesc>
          </ProfileHead>
          <ProfileInfo>
            <ProfileItem>
              <span>Full Name:</span> **** *****
            </ProfileItem>
            <ProfileItem>
              <span>Mobile:</span> **** *****
            </ProfileItem>
            <ProfileItem>
              <span>Email:</span> **** *****
            </ProfileItem>
            <ProfileItem>
              <span>Location:</span> **** *****
            </ProfileItem>
            <ProfileItem>
              <span>Social Media:</span> <Facebook /> <Twitter /> <Instagram />
            </ProfileItem>
          </ProfileInfo>
        </Profile>
      </MiddleItem>
      <BottomItem>
        <TitleBottom>
          <h4>Your Items</h4>
        </TitleBottom>
        <Item className="itemUser">
          <BodyItem>{mapItem()}</BodyItem>
        </Item>
      </BottomItem>
    </SideItem>
  );
};

const SideItem = styled.div`
  boxshadow: none;
  padding: 2rem;
  overflow: unset;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: calc(100% - 250px);
  @media only screen and (max-width: 1540px) {
    & {
      width: calc(100% - 200px);
    }
  }
  @media only screen and (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media only screen and (max-width: 1040px) {
    width: 100% !important;
  }
  @media only screen and (max-width: 935px) {
    padding: 1rem;
  }
  @media only screen and (max-width: 500px) {
    padding: 10px 10px;
    gap: 10px;
  }
`;
const TopItem = styled.div`
  height: 100px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 8px 8px 24px 0px #3b817dcf;
  @media only screen and (max-width: 500px) {
    height: 70px;
    padding: 10px;
  }
`;
const MiddleItem = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  @media only screen and (max-width: 500px) {
    height: 230px;
  }
`;
const BottomItem = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  box-shadow: 8px 8px 24px 0px #3b817dcf;
  border-radius: 10px 10px 0 0;
  overflow-x: auto;
`;
const AccountUser = styled.div`
  display: flex;
  align-items: center;
`;
const AvatarUser = styled.div`
  height: 65px;
  background-color: #fff;
  border-radius: 10px;
  margin-right: 10px;
  position: relative;
  img {
    width: 65px;
    height: 100%;
  }
  @media only screen and (max-width: 500px) {
    height: 50px;
    img {
      width: 50px;
    }
  }
`;
const UserInfo = styled.div``;
const UserName = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
const UserEmail = styled.div`
  font-size: 14px;
  opacity: 0.6;
  line-height: 1.2;
  @media only screen and (max-width: 500px) {
    font-size: 12px;
  }
`;
const Balance = styled.div`
  text-align: right;
  h1 {
    font-size: 24px;
    line-height: 1.2;
  }
  p {
    font-size: 12px;
    opacity: 0.6;
    line-height: 1.2;
  }
  @media only screen and (max-width: 500px) {
    h1 {
      font-size: 18px;
    }
    p {
      font-size: 10px;
    }
  }
  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 16px;
    }
  }
`;
const Update = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
`;
const Dashboard = styled.div`
  width: 66.6667%;
  padding: 1rem;
  box-shadow: 8px 8px 24px 0px #3b817dcf;
  border-radius: 10px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1125px) {
    width: 60%;
  }
  @media only screen and (max-width: 755px) {
    width: 50%;
  }
  @media only screen and (max-width: 620px) {
    display: none;
  }
`;
const Greeting = styled.div`
  line-height: 1.2;
  padding: 10px 0 20px;
  h1 {
    font-size: 45px;
    text-transform: uppercase;
    font-style: italic;
    color: rgb(48 198 209);
  }
  p {
    font-size: 18px;
    opacity: 0.6;
  }
`;
const Profile = styled.div`
  width: 33.3334%;
  padding: 1rem;
  box-shadow: 8px 8px 24px 0px #3b817dcf;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 15px;
  @media only screen and (max-width: 1125px) {
    width: 40%;
  }
  @media only screen and (max-width: 755px) {
    width: 50%;
  }
  @media only screen and (max-width: 620px) {
    width: 100%;
    margin-left: 0;
    padding: 10px;
  }
`;
const ProfileHead = styled.div`
  line-height: 1.2;
  h1 {
    font-size: 16px;
  }
`;
const ProfileDesc = styled.div`
  font-size: 16px;
  opacity: 0.6;
  padding: 15px 0;
  border-bottom: 1px solid #fff;
  margin: 0;
  @media only screen and (max-width: 500px) {
    font-size: 13px;
    padding: 6px 0 8px;
  }
`;
const ProfileInfo = styled.div``;
const ProfileItem = styled.div`
  font-size: 16px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  span {
    opacity: 0.6;
  }
  @media only screen and (max-width: 500px) {
    & {
      font-size: 13px;
    }
    &:first-child {
      padding: 10px 0 5px;
    }
    &:last-child {
      padding: 0;
    }
  }
`;
const TitleBottom = styled.div`
  padding: 20px 20px 10px;
  @media only screen and (max-width: 500px) {
    padding: 10px 10px 0;
  }
`;
const Item = styled.div`
  padding: 0 20px
  display: flex;
  overflow-x: scroll;
  transition: color 0.5s ease 0s;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  &::-webkit-scrollbar:vertical {
    width: 11px;
  }
  &::-webkit-scrollbar:horizontal {
    height: 9px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 2px solid white;
    background-color: rgba(0, 0, 0, 0.4);
    transition: color 0.5s ease 0s;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 10px;
  }
`;
const BodyItem = styled.div`
  padding: 0 1rem 1rem;
  display: flex;
  @media only screen and (max-width: 500px) {
    padding: 0 0 10px 0;
  }
`;
const FeaturedImage = styled.div`
  width: 280px;
  color: white;
  flex-direction: column;
  border-radius: 10px;
  cursor: pointer;
  margin: 15px;
  position: relative;
  &:hover {
    box-shadow: 10px 10px 30px 0px rgb(0, 195, 254);
  }
  @media only screen and (max-width: 500px) {
    width: 250px;
  }
`;
const FeaturedContainer = styled.div`
  overflow: hidden;
  align-items: center;
  display: flex;
  position: relative;
  border-radius: inherit;
  height: 280px;
  @media only screen and (max-width: 500px) {
    height: 250px;
  }
`;

export default memo(Users);
