import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { SideItemContainer, HeaderText } from "./Market";
import Web3 from "web3";
import axios from "axios";
import Heart from "../Market/components/icon/Heart";
import Speed from "../Market/components/icon/Speed";
import Toast from "../Toast/Toast";
import Skill from "../Market/components/icon/Skill";
import styled from "styled-components";
import useAPI from "../../API";
import Spinner from "./components/Spinner";
import FBStoken from "../Nav/components/Icon/FBStoken";
import Durability from "../Market/components/icon/Durability";
import useProvider from "../../Provider";

const DetailMarket = () => {
  const { API } = useAPI();
  const { chainId } = useWeb3React();
  const { Provider } = useProvider();
  const location = useLocation();
  const [dataItem, setDataItem] = useState(
    location.state ? location.state : undefined
  );
  const [nftName, setNftName] = useState();
  const [isSpinner, setIsSpinner] = useState(false);
  const web3 = new Web3(Web3.givenProvider);
  const accountMint = process.env.REACT_APP_DEFFAULT_ADDRESS;

  const checkNameNFT = () => {
    switch (dataItem.name) {
      case "ss1_JetWing":
        return setNftName("Wings");
      case "ss1_NitroTank":
        return setNftName("Nitro");
      case "ss1_CarbonAmor":
        return setNftName("Armor");
      case "ss1_Engine":
        return setNftName("Engine");
      default:
        break;
    }
  };
  const convertDay = () => {
    if (!dataItem.updatedAt) return;
    let date = new Date(dataItem.updatedAt.split("T")[0]);
    let finalDate = date.toString().split(" ").slice(1, 4).join(" ");
    return finalDate;
  };
  const convertAddress = (account) => {
    if (!account) return;
    return account.substring(0, 6) + "..." + account.substring(37, 41);
  };

  const approvalToken = async () => {
    await setIsSpinner(true);
    const idLoading = await Toast("loading", "Approve pending...");
    if (!chainId && !nftName) return;
    await Provider(chainId, nftName).then(
      async ({ NFTsBuyFPS, ADDRESS_CONTRACT, account }) => {
        try {
          await NFTsBuyFPS.methods
            .approve(ADDRESS_CONTRACT, handleNumber(dataItem.price, 18))
            .send({ from: account })
            .then((res) => {
              Toast("update success", "Approval was successful", idLoading);
            });
        } catch (error) {
          setIsSpinner(false);
          Toast(
            "update reject",
            "Approve was rejected. Please try again",
            idLoading
          );
          console.log(error);
        }
      }
    );
  };
  const handleBuyNFT = async () => {
    if (!chainId) return;
    await approvalToken();
    const idLoading = await Toast("loading", "Buy NFT Pending, Please wait...");
    await Provider(chainId, nftName).then(
      async ({ NFTsMarket, ADDRESS_CONTRACT, account }) => {
        const tx = await NFTsMarket.methods
          .buyNFTMarket(dataItem.id, handleNumber(dataItem.price, 18))
          .encodeABI();
        const rawTx = {
          from: account,
          to: ADDRESS_CONTRACT,
          data: tx,
          gas: 1500000,
        };
        try {
          await web3.eth.sendTransaction(rawTx).then(async (response) => {
            console.log(response);
            await API(chainId).then(async (url) => {
              await axios({
                method: "post",
                url: `${url}/buyBox`,
                data: {
                  serial: dataItem.serial,
                  owner: account,
                },
              }).then(async (response) => {
                await API(chainId).then(async (url) => {
                  await axios({
                    method: "get",
                    url: `${url}/item/false`,
                  }).then((data) => {
                    Toast(
                      "update success",
                      "Buy NFT was successful, Please check your wallet",
                      idLoading
                    );
                    setIsSpinner(false);
                    window.location.replace("./");
                  });
                });
              });
            });
          });
        } catch (error) {
          setIsSpinner(false);
          Toast(
            "update reject",
            "Buy NFT was rejected. Please try again",
            idLoading
          );
          console.log(error);
        }
      }
    );
  };

  const handleNumber = (amount, decimals) => {
    var BN = web3.utils.BN;
    const amountTokenIn = (amount * 10 ** decimals).toLocaleString("fullwide", {
      useGrouping: false,
    });
    var number = new BN(amountTokenIn).toString();
    return number;
  };

  useEffect(() => {
    checkNameNFT();

    return () => {
      setDataItem([]);
    };
  }, []);

  return (
    <SideItemContainer>
      <HeaderText>SPACESHIP</HeaderText>
      <SideItem>
        <LeftItem>
          <ImgItem>
            <img src={dataItem.uri} alt="Image Item" />
          </ImgItem>
        </LeftItem>
        <RightItem>
          <HeaderItem>
            <h1>
              {dataItem.name} #{dataItem.id}
            </h1>
            <p>Type: {dataItem.type}</p>
          </HeaderItem>
          <DescItem>
            Lörem ipsum pyl sogt rödgrönrosa. Egong netinde olåment
            förnedringsrån i tukonade bjästa. Epiling kodysat pohon. Kroliligt
            exos gigagen prena fastän förpackningsfri. Ponarer prenoktiga
            kvasinor posk i pyr. Kvasitropi agnostigyn poheten. Intrangar öbel
            plusjobb i telere. Legga eping, i industrisafari och orade dimydade.
          </DescItem>
          <SkillList>
            <LeftList>
              <SkillItem>
                <Heart />
                <ContentSkill>
                  <h3>Health</h3>
                  <p>49</p>
                </ContentSkill>
              </SkillItem>
              <SkillItem>
                <Skill />
                <ContentSkill>
                  <h3>Skill</h3>
                  <p>35</p>
                </ContentSkill>
              </SkillItem>
            </LeftList>
            <RightList>
              <SkillItem>
                <Speed />
                <ContentSkill>
                  <h3>Speed</h3>
                  <p>61</p>
                </ContentSkill>
              </SkillItem>
              <SkillItem>
                <Durability />
                <ContentSkill>
                  <h3>Durability</h3>
                  <p>100/100</p>
                </ContentSkill>
              </SkillItem>
            </RightList>
          </SkillList>
          <PriceItem>
            <TitlePrice>Current Price:</TitlePrice>
            <Price>
              {dataItem.price} <FBStoken width={40} height={40} />
            </Price>
            {isSpinner ? (
              <DisableButton>
                <Spinner />
              </DisableButton>
            ) : (
              <ButtonPrice className="bg-btn" onClick={handleBuyNFT}>
                Buy Now
              </ButtonPrice>
            )}
          </PriceItem>
          <HistoryItem>
            <TitleHistory>Recent Mint History:</TitleHistory>
            <HistoryList>
              <Buyer>
                <h3>Owner:</h3>
                <p>{convertAddress(dataItem.owner)}</p>
              </Buyer>
              <Seller>
                <h3>Minter:</h3>
                <p>{convertAddress(accountMint)}</p>
              </Seller>
              <Day>
                <h3>Begin Mint</h3>
                <p>{convertDay()}</p>
              </Day>
            </HistoryList>
          </HistoryItem>
        </RightItem>
      </SideItem>
    </SideItemContainer>
  );
};

const SideItem = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  gap: 2rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
  @media only screen and (max-height: 1000px) and (min-width: 1040px) {
    height: 73vh;
  }
  @media only screen and (max-height: 900px) and (min-width: 1040px) {
    height: 70vh;
  }
  @media only screen and (max-height: 700px) and (min-width: 1040px) {
    height: 65vh;
  }
  @media only screen and (max-width: 2000px) {
    gap: 50px;
  }
  @media only screen and (max-width: 1600px) {
    gap: 25px;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    justify-content: normal;
    gap: 20px;
    padding-top: 0;
  }
`;
const LeftItem = styled.div`
  width: 800px;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  @media only screen and (max-width: 2000px) {
    width: 50%;
  }
  @media only screen and (max-width: 1400px) {
    height: 650px;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
    height: auto;
  }
`;
const RightItem = styled.div`
  width: 800px;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  @media only screen and (max-width: 2000px) {
    gap: 35px;
    width: 50%;
  }
  @media only screen and (max-width: 1800px) {
    gap: 25px;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
const ImgItem = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 22px;
  }
  @media only screen and (max-width: 1400px) {
    height: auto;
    img {
      object-fit: contain;
      border-radius: 22px;
    }
  }
  @media only screen and (max-width: 800px) {
    img {
      object-fit: cover;
    }
  }
`;
const HeaderItem = styled.div`
  h1 {
    font-weight: 600;
    font-size: 40px;
    margin--bottom: 5px;
    letter-spacing: 5px;
    line-height: 1.2;
  }
  p {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.5);
  }
  @media only screen and (max-width: 1600px) {
    h1 {
      font-size: 35px;
    }
  }
  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 13px;
    }
  }
`;
const DescItem = styled.div`
  line-height: 1.4;
  max-width: 750px;
  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`;
const LeftList = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  @media only screen and (max-width: 400px) {
    gap: 10px;
  }
`;
const RightList = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  @media only screen and (max-width: 400px) {
    gap: 10px;
  }
`;
const SkillList = styled.div`
  display: flex;
  gap: 100px;
  @media only screen and (max-width: 330px) {
    gap: 70px;
  }
`;
const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const ContentSkill = styled.div`
  h3 {
    font-size: 20px;
    font-weight: 500;
  }
  @media only screen and (max-width: 500px) {
    h3 {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 400px) {
    h3 {
      font-size: 13px;
    }
  }
`;
const PriceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TitlePrice = styled.div`
  font-size: 20px;
  font-weight: 400;
  @media only screen and (max-width: 800px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 40px;
  line-height: 1.2;
  @media only screen and (max-width: 1600px) {
    font-size: 35px;
  }
`;
const Button = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 20px;
`;
const ButtonPrice = styled.button`
  width: 200px;
  padding: 12px 40px;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
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
`;
const HistoryItem = styled.div`
  font-size: 20px;
  font-weight: 400;
  @media only screen and (max-width: 800px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 400px) {
    font-size: 13px;
  }
`;
const TitleHistory = styled.div``;
const HistoryList = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 750px;
  h3 {
    font-weight: 600;
  }
  @media only screen and (max-width: 800px) {
    h3 {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 400px) {
    h3 {
      font-size: 13px;
    }
  }
`;
const Buyer = styled.div``;
const Seller = styled.div`
  text-align: center;
`;
const Day = styled.div`
  text-align: right;
`;
const DisableButton = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  padding: 12px 40px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  cursor: not-allowed;
`;

export default DetailMarket;
