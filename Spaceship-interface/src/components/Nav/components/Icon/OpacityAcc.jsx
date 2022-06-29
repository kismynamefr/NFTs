import React, { memo, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Eye from "./Eye";
import Exit from "./Exit";

const OpacityAcc = ({
  setOpenChangeAccount,
  handleLogin,
  accountSplit,
  account,
  chainId,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const currentAddress = useRef();

  const handleChangeLogin = async () => {
    await setOpenChangeAccount(false);
    await handleLogin();
  };
  const checkChainID = () => {
    if (!chainId) return;
    return chainId === 4
      ? `https://rinkeby.etherscan.io/address/${account}`
      : chainId === 97
      ? `https://testnet.bscscan.com/address/${account}`
      : "";
  };
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(currentAddress.current.id);
  };
  useEffect(() => {
    let clear = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    return () => {
      clearTimeout(clear);
    };
  });

  return (
    <>
      <Opacity />
      <BNB>
        <ContainerAcc>
          <BodyAcc>
            <HeaderAcc>
              <Head>
                <h1>Account</h1>
                <Eye href={checkChainID()} />
              </Head>
              <IconExit
                onClick={() => {
                  setOpenChangeAccount(false);
                }}
              >
                <Exit />
              </IconExit>
            </HeaderAcc>
            <ContentAcc>
              <Title>
                <Status>
                  <span></span>
                  <span>Connected to Metamask</span>
                </Status>
                <Button onClick={handleChangeLogin}>Change</Button>
              </Title>
              <Address>
                <AddressAcc>
                  <span>Address:&nbsp;</span>
                  <span id={account} ref={currentAddress}>
                    {accountSplit}
                  </span>
                </AddressAcc>
                <Copys onClick={handleCopy}>
                  <img
                    src="https://app.flybylaunchpad.com/copy.png"
                    alt="Copy"
                  />
                  {isCopied ? (
                    <CopyText className="text">Copied</CopyText>
                  ) : null}
                </Copys>
              </Address>
            </ContentAcc>
          </BodyAcc>
        </ContainerAcc>
      </BNB>
    </>
  );
};
const Opacity = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 8;
  opacity: 1;
  transition: opacity 0.3s ease-in-out 0s;
  background-color: rgba(0, 0, 0, 0.35);
`;
const BNB = styled.div`
  position: absolute;
  inset: 0px;
  z-index: 10;
  height: 100vh;
`;
const ContainerAcc = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 9;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 440px;
  height: fix-content;
  border-radius: 22px;
  background: linear-gradient(to left, rgb(87 90 227), rgb(0, 195, 254))
    rgb(0, 20, 38);
  @media only screen and (max-width: 500px) {
    & {
      max-width: 310px;
    }
  }
  @media only screen and (max-width: 400px) {
    & {
      max-width: 280px;
    }
  }
`;
const BodyAcc = styled.div`
  position: relative;
  width: 100%;
  padding: 16px 32px;
  @media only screen and (max-width: 500px) {
    & {
      padding: 10px 10px;
    }
  }
`;
const HeaderAcc = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  @media only screen and (max-width: 500px) {
    & {
      margin-bottom: 10px;
    }
  }
`;
const Head = styled.div`
    display: flex;
    align-items center;
    padding: 5px 8px;
    h1 {
      font-size: 20px;
      font-family: montserrat,sans-serif;
      font-style: italic;
      font-weight: 500;
    }
    @media only screen and (max-width: 500px) {
      h1 {
        font-size: 18px;
        padding-left: 0;
      }
    } 
`;
const IconExit = styled.div`
  padding: 1px;
  background-color: rgba(231, 214, 229, 0.22);
  border-radius: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
  &:hover {
    background-color: rgb(48 101 209);
  }
  &:hover .icon-eye {
    visibility: visible;
  }
  @media only screen and (max-width: 500px) {
    & {
      width: 24px;
      height: 24px;
    }
  }
`;
const ContentAcc = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  padding: 16px;
  display: block;
  margin-bottom: 15px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @media only screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`;
const Status = styled.div`
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    font-style: italic;
    opacity: 0.9;
    font-weight: 300;
  }
  span:first-child {
    padding: 5px;
    background-color: #18ee18;
    border-radius: 50%;
    margin-right: 5px;
    border: 1px solid white;
  }
  @media only screen and (max-width: 500px) {
    span {
      font-size: 13px;
    }
  }
`;
const Button = styled.div`
  padding: 7px;
  justify-content: center;
  color: rgb(255, 255, 255);
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  border: 1px solid rgb(20 235 212);
  background-position: center right;
  background-size: 200%;
  font-size: 16px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
  max-width: 120px;
  font-style: italic;
  &:hover {
    background-position: left center;
  }
  @media only screen and (max-width: 500px) {
    & {
      margin: 10px auto;
      font-size: 13px;
      padding: 5px;
    }
  }
`;
const Address = styled.div`
  display: flex;
  align-items: center;
`;
const AddressAcc = styled.div`
  font-style: italic;
  font-weight: bold;
  margin-right: 30px;
  @media only screen and (max-width: 500px) {
    & {
      font-size: 14px;
      margin-right: 20px;
    }
  }
`;
const Copys = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.5s ease-in-out 0s;
  img {
    cursor: pointer;
    width: 17px;
    height: 18px;
  }
  @media only screen and (max-width: 500px) {
    img {
      width: 15px;
      height: 16px;
    }
  }
`;
const CopyText = styled.div`
  font-size: 12px;
  margin-left: 5px;
  padding: 0 6px 0 3px;
  font-style: italic;
  background-color: rgba(0, 10, 77, 0.23);
  border-radius: 6px;
`;
export default memo(OpacityAcc);
