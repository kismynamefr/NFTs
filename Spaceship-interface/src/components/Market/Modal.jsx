import React, { useState } from "react";
import styled from "styled-components";
import skill1 from "./components/img/spaceship.webp";
import skill2 from "./components/img/spaceship3.jpeg";
import skill3 from "./components/img/spaceship2.jpeg";
import Ether from "../Nav/components/Icon/FBStoken";
import Star from "./components/icon/Star";
import useProvider from "../../Provider";
import Spinner from "./components/Spinner";
import useAPI from "../../API";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import axios from "axios";
import Toast from "../Toast/Toast";

const Modal = ({ setDetail, res, setNFTlist }) => {
  const web3 = new Web3(Web3.givenProvider);
  const { API } = useAPI();
  const { chainId } = useWeb3React();
  const { Provider } = useProvider();
  const [isSpinner, setIsSpinner] = useState(false);
  const [nftName, setNftName] = useState();

  console.log(res.serial);
  const checkNameNFT = () => {
    switch (res.name) {
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

  const approvalToken = async () => {
    await setIsSpinner(true);
    const idLoading = await Toast("loading", "Approve pending...");
    if (!chainId && !nftName) return;
    await Provider(chainId, nftName).then(
      async ({ NFTsBuyFPS, ADDRESS_CONTRACT, account }) => {
        try {
          await NFTsBuyFPS.methods
            .approve(ADDRESS_CONTRACT, handleNumber(res.price, 18))
            .send({ from: account })
            .then((res) => {
              Toast("update success", "Approval was successful", idLoading);
            });
        } catch (error) {
          setIsSpinner(false);
          Toast("update reject", "Approve was rejected. Please try again", idLoading);
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
          .buyNFTMarket(res.id, handleNumber(res.price, 18))
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
                  serial: res.serial,
                  owner: account,
                },
              }).then(async(response) => {
                await API(chainId).then(async (url) => {
                  await axios({
                    method: "get",
                    url: `${url}/item/false`,
                  }).then(data => {
                    const newRes = data.data.sort((a, b) => a.type.localeCompare(b.type));
                    Toast("update success", "Buy NFT was successful, Please check your wallet", idLoading);
                    setNFTlist(newRes);
                    setIsSpinner(false);
                    handleClosed();
                  })
                })
              });
            });
          });
        } catch (error) {
          setIsSpinner(false);
          Toast("update reject", "Buy NFT was rejected. Please try again", idLoading);
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

  const handleClosed = () => {
    setDetail(false);
  };

  useState(() => {
    checkNameNFT();

    return () => {
      setNFTlist([]);
    };
  }, []);

  return (
    <>
      <Opacity onClick={handleClosed} />
      <DetailItem>
        <DetailBackground>
          <DetailImg>
            <img src={res.uri} alt="" />
          </DetailImg>
          <DetailTittle>
            <DetailName>
              <DetailNameLeft>
                <h1>Type Item: {res.type}</h1>
                <h3>Lv 1</h3>
              </DetailNameLeft>
              <DetailNameRight>
                <h3>Legendary</h3>
                <StarMain>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </StarMain>
              </DetailNameRight>
            </DetailName>
            <DetailMain>
              <IndexSpace>
                {/* <Icon_main></Icon_main> */}
                <h4>HP: </h4>
                <h5>720</h5>
              </IndexSpace>
              <IndexSpace>
                {/* <Icon_main></Icon_main> */}
                <h4>Dame/Bullet: </h4>
                <h5>48</h5>
              </IndexSpace>
              <IndexSpace>
                {/* <Icon_main></Icon_main> */}
                <h4>Fire rate: </h4>
                <h5>0.15s</h5>
              </IndexSpace>
              <IndexSpace>
                {/* <Icon_main></Icon_main> */}
                <h4>Range: </h4>
                <h5>8</h5>
              </IndexSpace>
              <IndexSpace>
                {/* <Icon_main></Icon_main> */}
                <h4>Crit Change: </h4>
                <h5>3%</h5>
              </IndexSpace>
              <IndexSpace>
                {/* <Icon_main></Icon_main> */}
                <h4>Crit Dame: </h4>
                <h5>150%</h5>
              </IndexSpace>
            </DetailMain>
            <DetailSkill>
              <SkillMain>
                <img src={skill1} alt="" />
                <span>Callteam</span>
              </SkillMain>
              <SkillMain>
                <img src={skill2} alt="" />
                <span>RFYL</span>
              </SkillMain>
              <SkillMain>
                <img src={skill3} alt="" />
                <span>Skill 3</span>
              </SkillMain>
              <SkillMain>
                <img src={skill1} alt="" />
                <span>Skill 1</span>
              </SkillMain>
              <SkillMain>
                <img src={skill1} alt="" />
                <span>Skill 1</span>
              </SkillMain>
            </DetailSkill>
            <DetailPrice>
              <PriceDetail>
                <Ether width={20} height={20} />
                <h2>{res.price}</h2>
              </PriceDetail>
              {isSpinner ? (
                <DisableButton>
                  <Spinner />
                </DisableButton>
              ) : (
                <ButtonPrice onClick={handleBuyNFT}>Buy Now</ButtonPrice>
              )}
            </DetailPrice>
          </DetailTittle>
        </DetailBackground>
      </DetailItem>
    </>
  );
};

const Opacity = styled.div`
  display: flex;
  position: fixed;
  cursor: pointer;
  width: 100%;
  height: 100%;
  inset: 0px;
  z-index: 6;
  background-color: rgba(0, 0, 0, 0.7);
  background-position: center center;
  filter: blur(8px);
  -webkit-mask: linear-gradient(rgb(126 45 193), #86313100);
`;
const DetailItem = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  min-width: 1000px;
  border: 2px solid #757575;
  border-radius: 10px;
  background: linear-gradient(
    117.45deg,
    rgba(255, 255, 255, 0) -3.91%,
    rgba(255, 255, 255, 0.039) 75.27%
  );
  backdrop-filter: blur(42px);
  @media only screen and (max-width: 1050px) {
    min-width: 700px;
  }
  @media only screen and (max-width: 750px) {
    min-width: 400px;
  }
  @media only screen and (max-width: 500px) {
    width: 300px;
    min-width: 300px;
  }
`;
const DetailBackground = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 750px) {
    flex-direction: column;
  }
`;
const DetailImg = styled.div`
  width: 50%;
  min-height: 700px;
  img {
    border-radius: 10px 0 0 10px;
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  @media only screen and (max-width: 1050px) {
    & {
      min-height: 400px;
    }
  }
  @media only screen and (max-width: 750px) {
    & {
      width: 100%;
      min-height: 200px;
    }
    img {
      border-radius: 10px 10px 0 0;
    }
  }
  @media only screen and (max-width: 500px) {
    & {
      min-height: 150px;
    }
  }
`;
const DetailTittle = styled.div`
  width: 50%;
  padding: 20px;
  gap: 10px;
  @media only screen and (max-width: 1050px) {
    & {
      padding: 10px 20px 15px;
    }
  }
  @media only screen and (max-width: 750px) {
    width: 100%;
  }
  @media only screen and (max-width: 500px) {
    & {
      padding: 0 10px 20px;
    }
  }
`;
const DetailName = styled.div`
  display: flex;
  flex-flow; row;
  justify-content: space-between;
`;
const DetailNameLeft = styled.div`
  width: 70%;
  @media only screen and (max-width: 500px) {
    h1 {
      font-size: 24px;
    }
    h3 {
      font-size: 16px;
    }
  }
`;
const DetailNameRight = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  @media only screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
const StarMain = styled.div`
  display: flex;
  gap: 3px;
`;
const DetailMain = styled.div`
  display: flex;
  flex-flow: column;
  width: 90%;
  margin: 0 auto;
`;
const DetailSkill = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  justify-content: space-between;
  gap: 5px;
  @media only screen and (max-width: 750px) {
    display: none;
  }
`;
const DetailPrice = styled.div`
  display: flex;
  padding: 20px 20px 0 0;
  align-items: flex-end;
  flex-flow: column;
  gap: 10px;
  @media only screen and (max-width: 1050px) {
    padding: 10px 20px 0 0;
  }
  @media only screen and (max-width: 500px) {
    padding: 20px 0 0;
    & {
      flex-flow: row;
      justify-content: space-between;
    }
  }
`;
const PriceDetail = styled.div`
  display: flex;
  gap: 5px;
`;
const ButtonPrice = styled.button`
  padding: 10px 40px;
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
  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
const SkillMain = styled.div`
  width: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 5px;
  img {
    width: 68px;
    height: 68px;
    object-fit: cover;
    border: 1px solid #8f6aff;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 30px #750cd8;
      transition: all 0.5s ease-out;
    }
  }
  @media only screen and (max-width: 1050px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
  @media only screen and (max-width: 500px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
`;
const IndexSpace = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 15px 0;
  border-bottom: 1px solid;
  @media only screen and (max-width: 500px) {
    font-size: 13px;
    padding: 10px 0;
  }
`;

const DisableButton = styled.div`
  padding: 10px 50px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  cursor: not-allowed;
`;

export default Modal;
