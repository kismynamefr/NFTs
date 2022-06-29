import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import FBStoken from "../../Nav/components/Icon/FBStoken";
import Exit from "../../Nav/components/Icon/Exit";
import Carditem from "./CardItem";
import Loading from "../../Market/components/Loading";
import axios from "axios";
import Web3 from "web3";
import useProvider from "../../../Provider";
import useAPI from "../../../API";

const ModalBox = ({ openBox, setOpenBox, objectItem }) => {
  const web3 = new Web3(Web3.givenProvider);
  const { API } = useAPI();
  const { chainId } = useWeb3React();
  const { Provider } = useProvider();
  const [cardItem, setCardItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState();

  //ratio of box
  let S = 0.26;
  let A = 0.66;
  let B = 3.2;
  let C = 16;
  let D = 80;
  //-----------//
  let count = 0;

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  const handleOpenBox = () => {
    const number = getRandomNumber(0, 100);
    console.log(`Number:`, number);
    if (number > 0 && number < S) {
      getData("S");
    } else if (number > S && number < A) {
      getData("A");
    } else if (number > A && number < B) {
      getData("B");
    } else if (number > B && number < C) {
      getData("C");
    } else if (number > C && number < 100) {
      getData("D");
    }
  };
  const approvalToken = async () => {
    let objectName = objectItem.name.replace("Box", "").trim();
    if (!chainId) return;
    await Provider(chainId, objectName).then(
      async ({ NFTsBuyFPS, ADDRESS_CONTRACT, account }) => {
        const price = objectItem.price.split(",").join("");
        await NFTsBuyFPS.methods
          .approve(ADDRESS_CONTRACT, handleNumber(price, 18))
          .send({ from: account })
          .then((res) => {
            setCardItem(true);
            setIsLoading(true);
          });
      }
    );
  };

  const getData = async (type) => {
    if (!chainId) return;
    let objectName = objectItem.name.replace("Box", "").trim();
    await approvalToken();
    setCardItem(true);
    setIsLoading(true);
    await Provider(chainId, objectName).then(
      async ({ NFTsMarket, ADDRESS_CONTRACT, account }) => {
        const price = objectItem.price.split(",").join("");
        const arrNFT = await NFTsMarket.methods.fetchMarketItems().call();
        const listId = arrNFT.filter((res) => res.typeItem === type);
        const nftID = listId[listId.length - 1]?.tokenId;
        const serial = listId[listId.length - 1]?.serial;
        const amount = handleNumber(price, 18);
        const tx = await NFTsMarket.methods.openBox(nftID, amount).encodeABI();
        const rawTx = {
          from: account,
          to: ADDRESS_CONTRACT,
          data: tx,
          gas: 1500000,
        };
        setItem(listId[listId.length - 1]);
        await web3.eth.sendTransaction(rawTx).then(async (res) => {
          console.log(res);
          API(chainId).then(async (url) => {
            await axios({
              method: "post",
              url: `${url}/buyBox`,
              data: {
                serial,
                owner: account,
              },
            }).then((res) => {
              setIsLoading(false);
            });
          });
        });
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
    return () => {
      setItem([]);
    };
  }, []);

  return openBox ? (
    <>
      <Opacity
        onClick={() => {
          setCardItem(false);
          setOpenBox(false);
        }}
      />
      {cardItem ? (
        isLoading ? (
          <Loading />
        ) : (
          <Carditem item={item} />
        )
      ) : (
        <ModalBoxs>
          <ContainerBox>
            <ImgBox>
              <img src={objectItem.url} />
            </ImgBox>
            <IconExit onClick={() => setOpenBox(false)}>
              <Exit />
            </IconExit>
            <NameBox>{objectItem.name}</NameBox>
            <PriceBox>
              <p>Total:</p>
              <Price>
                <FBStoken width={20} height={20} />
                <p>{objectItem.price}</p>
              </Price>
            </PriceBox>
            <ButtonBox onClick={handleOpenBox}>Buy</ButtonBox>
          </ContainerBox>
        </ModalBoxs>
      )}
    </>
  ) : null;
};

const Opacity = styled.div`
  position: fixed;
  inset: 0px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out 0s;
  background-color: rgba(0, 0, 0, 0.7);
`;
const ModalBoxs = styled.div`
  position: absolute;
  inset: 0px;
  z-index: 999;
  height: 100vh;
`;
const ContainerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  min-width: 400px;
  padding: 1.5rem;
  border: 2px solid #757575;
  border-radius: 10px;
  background: linear-gradient(
    117.45deg,
    rgba(255, 255, 255, 0) -3.91%,
    rgba(255, 255, 255, 0.039) 75.27%
  );
  backdrop-filter: blur(42px);
  @media only screen and (max-width: 500px) {
    min-width: 280px;
  }
  @media only screen and (max-width: 350px) {
    min-width: 250px;
  }
`;
const ImgBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  img {
    width: 20vh;
  }
  @media only screen and (max-width: 500px) {
    img {
      width: 18vh;
    }
  }
`;
const IconExit = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 30px;
  height: 30px;
  background-color: rgba(231, 214, 229, 0.22);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
  &:hover {
    background-color: rgb(0, 195, 254);
  }
  @media only screen and (max-width: 500px) {
    width: 25px;
    height: 25px;
  }
`;
const NameBox = styled.div`
  margin-top: 10px;
  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const ButtonBox = styled.div`
  text-align: center;
  padding: 7px;
  width: 100%;
  border-radius: 10px;
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

export default ModalBox;
