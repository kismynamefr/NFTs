import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { SideItemContainer } from "../Market/Market";
import { LoadHistories } from "../../Redux/action/actionFetchHistory";
import { useDispatch, useSelector } from "react-redux";
import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Banners from "./img/Banner.gif";
import FBStoken from "../Nav/components/Icon/FBStoken";
import SliderHome from "./Slider/SliderHome";
import useProvider from "../../Provider";

const Home = () => {
  const { Provider } = useProvider();
  const { account, chainId } = useWeb3React();
  const [accounts, setAccounts] = useState();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.histories.data);

  const handleAccount = useCallback(() => {
    if (!account) return;
    const splitAddress =
      account.substring(0, 6) + "..." + account.substring(37, 42);
    setAccounts(splitAddress);
  }, [account]);

  const fetchBackupItem = useCallback(async () => {
    if (!chainId) return;
    await Provider(chainId, "Nitro").then(async ({ NFTsMarket }) => {
      console.log(await NFTsMarket.methods.fetchMarketItems().call());
    });
  }, [chainId, Provider]);

  const convertOwner = (owner) => {
    const splitAddress =
      owner.substring(0, 5) + "..." + owner.substring(37, 42);
    return splitAddress;
  };

  const convertData = () => {
    data &&
      data.sort((a, b) => {
        let unixTimeStampA = new Date(a.updatedAt).getTime();
        let unixTimeStampB = new Date(b.updatedAt).getTime();
        return unixTimeStampB - unixTimeStampA;
      });
    const newData = data && data.splice(0, 5);

    return newData && newData.map((res) => {
      let unixTimeStamp = new Date(res.updatedAt).getTime();
      let unixTimeStampNow = new Date().getTime();
      let timeRight = ((unixTimeStampNow - unixTimeStamp)/60/1000).toFixed(0);
      return (
        <Users key={res.serial}>
          <UsersConsident>
            <Avatars src={res.uri} />
            <UsersText>
              <h4>
                {res.name} #{res.id}
              </h4>
              <p>{convertOwner(res.owner)}</p>
              <p style={{ color: "#8d8b8b" }}>{timeRight > 60 ? `${(timeRight/60).toFixed(0)} hours ago` : `${timeRight} mins ago`}</p>
            </UsersText>
          </UsersConsident>
          <Prices>
            <FBStoken height={15} width={15} />
            <p>{res.price}</p>
          </Prices>
        </Users>
      );
    });
  };

  useEffect(() => {
    handleAccount();
    fetchBackupItem();
    return () => {
      setAccounts("");
    };
  }, [handleAccount, fetchBackupItem]);

  useEffect(() => {
    if (!chainId) return;
    dispatch(LoadHistories(chainId));
  }, [chainId]);

  return (
    <SideItemContainer>
      <HeaderText>
        HELLO,<p>{accounts}</p>
      </HeaderText>
      <SideItem style={{ flexWrap: "nowrap", boxShadow: "none" }}>
        <MiddleSide>
          <Banner>
            <Title>
              <div>
                <h1>
                  Collect & Sell <br /> Your Item
                </h1>
              </div>
              <div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                </p>
              </div>
              <Buttons style={{ maxWidth: "200px", fontSize: "14px" }}>
                EXPLORE NOW
              </Buttons>
            </Title>
          </Banner>
          <HotItem>
            <TitleHotItem>
              <h1>HOT ITEM</h1>
              <Link to="/Markets">
                <ButtonView>
                  <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                  </span>
                  <span className="button-text">View All</span>
                </ButtonView>
              </Link>
            </TitleHotItem>
            <ItemSlider>
              <SliderHome />
            </ItemSlider>
          </HotItem>
        </MiddleSide>
        <RightSide>
          <History>
            <h3>History</h3>
            <Days>
              <option>Last Days</option>
              <option>Last Month</option>
              <option>Last Years</option>
            </Days>
          </History>
          {convertData()}
        </RightSide>
      </SideItem>
    </SideItemContainer>
  );
};

const HeaderText = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0px;
  font-weight: 100;
  font-size: 30px;
  letter-spacing: 5px;
  text-shadow: 0px 4px 3px rgb(0 0 0 / 40%), 0px 8px 13px rgb(0 0 0 / 10%),
    0px 18px 23px rgb(0 0 0 / 10%);
  font-family: sans-serif;
  font-style: italic;
  p {
    font-weight: 900;
  }
  @media only screen and (max-width: 500px) {
    font-size: 26px;
    p {
      font-weight: 800;
    }
  }
  @media only screen and (max-width: 400px) {
    font-size: 20px;
    p {
      font-weight: bold;
    }
  }
`;
const SideItem = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  box-shadow: 8px 8px 24px 0px #3b817dcf;
  border-radius: 10px;
  &::-webkit-scrollbar {
    width: 0px;
  }
  @media only screen and (max-width: 1005px) {
    padding: 0px 10px 10px;
  }
  @media only screen and (max-width: 500px) {
    padding: 0;
  }
`;
const MiddleSide = styled.div`
  width: calc(100% - 400px);
  overflow: hidden;
  display: flex;
  flex-flow: column;
  gap: 20px;
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
  @media only screen and (max-width: 1250px) {
    width: 100% !important;
  }
  @media only screen and (max-width: 1700px) {
    width: calc(100% - 300px);
  }
  @media only screen and (max-width: 500px) {
    gap: 15px;
  }
`;

const Banner = styled.div`
  width: 100%;
  min-height: 30vh;
  border-radius: 15px;
  background: url(${Banners});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 0.5s ease-out;
  @media only screen and (max-width: 1540px) {
    & {
      padding: 10px 20px;
    }
  }
  @media only screen and (max-width: 700px) {
    min-height: 40vh;
  }
  @media only screen and (max-width: 500px) {
    min-height: 45vh;
  }
`;
const RightSide = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  background: linear-gradient(
    123.64deg,
    rgba(255, 255, 255, 0) -22.38%,
    rgba(255, 255, 255, 0.039) 70.38%
  );
  backdrop-filter: blur(42px);
  border-radius: 20px;
  border: 2px solid #757575;
  margin: 0 2rem;
  padding: 1rem 2rem;
  transition: all 0.5s ease-out;
  @media only screen and (max-width: 1700px) {
    max-width: 300px;
    margin: 0 1rem;
    padding: 1rem 1rem;
  }
  @media only screen and (max-width: 1250px) {
    display: none;
  }
`;

const Title = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  gap: 12px;
  padding-left: 5em;
  justify-content: center;
  @media only screen and (max-width: 1540px) {
    & {
      padding-left: 1rem;
      gap: 0px;
    }
    & h1 {
      line-height: 1.2;
      font-size: 28px;
    }
    & p {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 500px) {
    & h1 {
      font-size: 24px;
    }
    & p {
      font-size: 13px;
    }
  }
  @media only screen and (max-width: 400px) {
    & h1 {
      font-size: 20px;
    }
    & p {
      font-size: 12px;
    }
  }
`;
const History = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 2rem;
`;
const Days = styled.select`
  background: transparent;
  color: inherit;
  padding: 0 5px;
  border: 2px solid #5b5b5b;
  border-radius: 5px;
  &:focus-visible {
    border: 2px solid #5b5b5b;
    outline: none;
  }
`;
const Users = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
`;
const UsersConsident = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Avatars = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  transition: all 0.5s ease-out;
  object-fit: cover;
  @media only screen and (max-width: 1700px) {
    width: 40px;
    height: 40px;
  }
`;
const UsersText = styled.div`
  transition: all 0.5s ease-out;
  p {
    font-size: 13px;
  }
  @media only screen and (max-width: 1700px) {
    p {
      font-size: 12px;
    }
  }
`;
const Prices = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const HotItem = styled.div`
  width: 100%;
  overflow: hidden;
`;
const TitleHotItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-weight: 400;
    font-family: sans-serif;
  }
  @media only screen and (max-width: 1540px) {
    & h1 {
      font-size: 24px;
    }
  }
  @media only screen and (max-width: 500px) {
    & h1 {
      font-size: 22px;
    }
  }
  @media only screen and (max-width: 400px) {
    & h1 {
      font-size: 18px;
    }
  }
`;
const ButtonView = styled.button`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  width: 12rem;
  height: auto;
  @media only screen and (max-width: 500px) {
    & {
      width: 10rem;
    }
  }
  .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: linear-gradient(to left,rgb(0,4,254),rgb(0,195,254)) rgb(0,20,38);
    border-radius: 1.625rem;
    .icon {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      background: #FFFFF;
      &.arrow {
        transitionheight: height2 height2rem;
        : all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        left: 0.625rem;
        width: 1.125rem;
        height: 0.125rem;
        background: none;
        &::before {
          position: absolute;
          content: "";
          top: -0.25rem;
          right: 0.0625rem;
          width: 0.625rem;
          height: 0.625rem;
          border-top: 0.125rem solid #fff;
          border-right: 0.125rem solid #fff;
          transform: rotate(45deg);
        }
        @media only screen and (max-width: 500px) {
          &::before {
            left: -2px;
            top: -5px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 500px) {
    .circle {
      height: 2rem;
      width: 2rem;
    }
  }
  .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    background: linear-gradient(to left,rgb(0,4,254),rgb(0,195,254)) rgb(0,20,38);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
  }
  @media only screen and (max-width: 500px) {
    .button-text {
      top: -7px;
      font-size: 14px;
    }
  }
  &:hover {
    .circle {
      width: 100%;
      .icon {
        &.arrow {
        background: $white;
        transform: translate(1rem, 0);
        }
      }
    }
    .button-text {
      color: white;
      -webkit-text-fill-color: white;
    }
  }
}
`;
const ItemSlider = styled.div`
  // display: flex;
`;
const Buttons = styled.div`
  padding: 7px;
  justify-content: center;
  color: rgb(255, 255, 255);
  background: linear-gradient(266.82deg, #07fdff 0%, #0f07ff 100%);
  background-position: center right;
  background-size: 100%;
  font-size: 16px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
  &:hover {
    background-position: left center;
    background-size: 200%;
  }
  @media only screen and (max-width: 500px) {
    & {
      padding: 5px;
      font-size: 12px;
      border-radius: 8px;
    }
  }
`;
export default memo(Home);
