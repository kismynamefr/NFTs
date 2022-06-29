import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import Web3 from "web3";
import Menu from "./components/Icon/Menu";
import Toast from "../Toast/Toast";
import styled from "styled-components";
import Metamask from "./components/Icon/Metamask";
import Coinbase from "./components/Icon/Coinbase";
import FBStoken from "./components/Icon/FBStoken";
import Sidemint from "./SideMint";
import Ethereum from "./components/Icon/Ethereum";
import BNBChain from "./components/Icon/BNBChain";
import Fobitlogo from "./logo/SpaceAstronaut.png";
import OpacityEth from "./components/Icon/OpacityEth";
import OpacityAcc from "./components/Icon/OpacityAcc";
import useProvider from "../../Provider";
import useWindowSize from "../useWindowSize";

const Nav = () => {
  const web3 = new Web3(Web3.givenProvider);
  const { width } = useWindowSize();
  const { Provider } = useProvider();
  const { activate, deactivate, chainId, account, library } = useWeb3React();
  const [isLogin, setIsLogin] = useState(false);
  const [balances, setBalances] = useState("");
  const [sideMint, setSideMint] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkMint, setCheckMint] = useState(false);
  const [balanceFBS, setBalanceFBS] = useState();
  const [accountSplit, setAccountSplit] = useState();
  const [openChangeNetwork, setOpenChangeNetwork] = useState(false);
  const [openChangeAccount, setOpenChangeAccount] = useState(false);

  const checkAccount = useCallback(() => {
    const defaulAddress = process.env.REACT_APP_DEFFAULT_ADDRESS;
    return defaulAddress === account ? setCheckMint(true) : setCheckMint(false);
  }, [account]);

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/ed5e80b075e747989bb3e575860cafaf`,
    appName: "Opensea Marketplace",
    supportedChainIds: [1, 3, 56, 97, 137, 43114],
  });

  const MetaMask = new InjectedConnector({
    supportedChainIds: [1, 3, 56, 97, 137, 43114],
  });

  const handleLoginMetamask = async () => {
    // if (isChecked) {
    await activate(MetaMask);
    await setIsLogin(false);
    // }
  };
  const handleLoginCoinBase = () => {
    if (isChecked) {
      activate(CoinbaseWallet);
    }
  };
  const handleAccount = useCallback(async () => {
    const splitAddress =
      account.substring(0, 6) + "..." + account.substring(38, 42);
    setAccountSplit(splitAddress);
    library?.getBalance(account).then((result) => {
      const balanceFix = web3.utils.fromWei(String(result), "ether");
      setBalances(Number(balanceFix).toFixed(4));
    });
  }, [account, chainId, library]);

  const handleLogin = () => {
    return !isLogin ? setIsLogin(true) : setIsLogin(false);
  };
  const handleOpenMenu = () => {
    setOpenMenu(true);
  };
  const HandleChecked = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleClosed = () => {
    setIsLogin(false);
  };
  const handleSideMint = () => {
    return setSideMint(true);
  };
  const handleOpenAccount = () => {
    return setOpenChangeAccount(true);
  };
  const handleChangeNetwork = async (chainId) => {
    switch (chainId) {
      case "3":
        await library.provider
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x3" }],
          })
          .then(() => {
            setOpenChangeNetwork(false);
          });
        return;
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
              await library.provider
                .request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x61",
                      rpcUrls: [
                        "https://data-seed-prebsc-1-s1.binance.org:8545",
                      ],
                      chainName: "Binance Smart Chain Testnet",
                      nativeCurrency: {
                        name: "BNB",
                        decimals: 18,
                        symbol: "tBNB",
                      },
                      blockExplorerUrls: ["https://testnet.bscscan.com"],
                    },
                  ],
                })
                .then((data) => {
                  setOpenChangeNetwork(false);
                });
            } catch (error) {
              console.error(error);
            }
          }
        }
        return;
      default:
        return null;
    }
  };
  const handleOpenNetworkSide = () => {
    return setOpenChangeNetwork(true);
  };
  const checkChainid = (checkBalance = false) => {
    if (!chainId) return;
    return chainId === 3 ? (
      <>
        <Ethereum width={20} height={20} />
        {checkBalance ? `${balances} ETH` : "Ethereum"}
      </>
    ) : chainId === 97 ? (
      <>
        <BNBChain width={20} height={20} />
        {checkBalance ? `${balances} BNB` : "BNB Chain"}
      </>
    ) : (
      <>Wrong Network</>
    );
  };
  const checkBalanceTokenFBS = useCallback(async () => {
    if (!chainId) return;
    await Provider(chainId, "Wings").then(({ balanceFBS }) => {
      if (!balanceFBS) return setBalanceFBS(0);
      const balanceFix = web3.utils.fromWei(String(balanceFBS), "ether");
      setBalanceFBS(balanceFix);
    });
  }, [chainId]);

  const openAccount = () => {
    return account ? (
      <>
        <ButtonEth onClick={handleOpenNetworkSide}>
          <Balance style={{ paddingLeft: 0 }}>
            <Network>{checkChainid(false)}</Network>
          </Balance>
        </ButtonEth>
        <OpacityEth
          isOpen={openChangeNetwork}
          setOpenChangeNetwork={setOpenChangeNetwork}
          handleChangeNetwork={handleChangeNetwork}
        />
        <BalanceFBS>
          <Button>
            <Balance style={{ paddingLeft: 0 }}>
              <FBStoken width={20} height={20} /> {balanceFBS} FBS
            </Balance>
          </Button>
        </BalanceFBS>
        <AccountConnect>
          <Balance>{checkChainid(true)}</Balance>
          <ButtonAccount onClick={handleOpenAccount}>
            {accountSplit}
          </ButtonAccount>
        </AccountConnect>
        {openChangeAccount ? (
          <OpacityAcc
            accountSplit={accountSplit}
            account={account}
            handleLogin={handleLogin}
            setOpenChangeAccount={setOpenChangeAccount}
            chainId={chainId}
          />
        ) : null}
        <IconMenu onClick={handleOpenMenu}>
          <Line className="line-1"></Line>
          <Line></Line>
          <Line className="line-3"></Line>
        </IconMenu>
      </>
    ) : (
      <Account onClick={handleLogin}>
        <Button>Connect Wallet</Button>
      </Account>
    );
  };
  const isLogined = () => {
    return isLogin ? (
      <>
        <Opacity onClick={handleClosed}></Opacity>
        <ModalLogin>
          <Login>
            <ContentLogin>
              <span>Connect Wallet</span>
              <span onClick={handleClosed}>X</span>
            </ContentLogin>
            <PolicyLogin>
              <PolicyContent>
                By connecting a wallet, you agree to <span>forbitspace</span>
                <a href="/#">Terms of Service</a> and
                <a href="/#">Privacy Policy</a>
              </PolicyContent>
              <PolicyCheck>
                <input type="checkbox" onChange={HandleChecked} />
                <span> I agree to Terms of Service and Privacy policy</span>
              </PolicyCheck>
            </PolicyLogin>
            <Wallet>
              <OpacityWallet
                disable={isChecked ? "none" : "flex"}
              ></OpacityWallet>
              <IconWallet dis={isChecked ? "all" : "none"}>
                <Icon
                  check={isChecked ? "#00000021" : "none"}
                  col={isChecked ? "rgb(19, 149, 255)" : "white"}
                  onClick={handleLoginMetamask}
                >
                  <Metamask />
                  <span>Metamask</span>
                </Icon>
                <Icon
                  check={isChecked ? "#00000021" : "none"}
                  col={isChecked ? "rgb(19, 149, 255)" : "white"}
                  onClick={handleLoginCoinBase}
                >
                  <Coinbase />
                  <span className="coinbase">Coinbase</span>
                </Icon>
              </IconWallet>
              <ContentIcon>
                <span>New to Ethereum?</span>
                <a href="/#">Learn more about wallets</a>
              </ContentIcon>
            </Wallet>
          </Login>
        </ModalLogin>
      </>
    ) : null;
  };

  const checkChainNetwork = useCallback(() => {
    if (!chainId) return;
    return chainId === 3
      ? Toast("success", "You are connected to the Ropsten network!!!")
      : chainId === 97
      ? Toast("success", "You are connected to the BNB testnet network!!!")
      : Toast(
          "error",
          "Incorrect network. Please change your network to Ropsten or BNB chain!!!"
        );
  }, [chainId]);

  useEffect(() => {
    checkChainNetwork();
  }, [checkChainNetwork]);

  useEffect(() => {
    handleLoginMetamask();
  }, []);

  useEffect(() => {
    checkAccount();
  }, [checkAccount]);

  useLayoutEffect(() => {
    checkBalanceTokenFBS();
    if (account) {
      handleAccount();
    }
  }, [handleAccount]);

  return (
    <>
      {isLogined()}
      <NavHeader col={width < 1040 ? "#0000003d" : "transparent"}>
        <Container>
          <Left>
            <img className="logoDesktop" src={`${Fobitlogo}`} alt="" />
          </Left>
          <Right>
            {checkMint ? (
              <Account>
                <Button onClick={handleSideMint}>Mint NFTs</Button>
              </Account>
            ) : null}
            {openAccount()}
          </Right>
        </Container>
        {openMenu ? <Menu setOpenMenu={setOpenMenu} /> : null}
      </NavHeader>
      {sideMint ? (
        <>
          <SideMint>
            <Sidemint
              account={account}
              sideMint={sideMint}
              setSideMint={setSideMint}
            />
          </SideMint>
        </>
      ) : null}
    </>
  );
};
const SideMint = styled.div``;
const Opacity = styled.div`
  display: flex;
  position: fixed;
  inset: 0px;
  z-index: 5;
  opacity: 1;
  transition: opacity 0.3s ease-in-out 0s;
  background-color: rgba(0, 0, 0, 0.35);
`;
const OpacityWallet = styled.div`
  display: ${(props) => props.disable};
  opacity: 0.5;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0 0 10px;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  z-index: 9;
`;
const ModalLogin = styled.div`
  display: flex;
  position: absolute;
  color: white !important;
  width: 100%;
  height: 100%;
`;
const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 9;
  box-shadow: 8px 8px 24px 0px #169193cf;
  padding: 0px;
  width: 70vw;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  overflow: hidden;
  align-self: center;
  max-width: 760px;
  max-height: 90vh;
  display: flex;
  border-radius: 22px;
  margin: 0 auto;
  @media only screen and (max-width: 620px) {
    & {
      width: 85vw;
    }
  }
  @media only screen and (max-width: 400px) {
    & {
      width: 90vw;
    }
  }
`;
const ContentLogin = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  padding: 1rem;
  font-weight: 500;
  color: inherit;
  justify-content: space-between;
  span {
    cursor: pointer;
    &:hover {
      color: rgb(19, 149, 255);
    }
  }
  @media only screen and (max-width: 500px) {
    & {
      font-size: 13px;
    }
  }
`;
const PolicyLogin = styled.div`
  width: 90%;
  margin: 0px auto;
  color: rgb(255, 255, 255);
  padding: 1rem;
  border-radius: 12px;
  background: #202336;
  @media only screen and (max-width: 500px) {
    & {
      font-size: 13px;
      padding: 10px;
    }
  }
`;
const PolicyContent = styled.div`
  span {
    font-family: Montserrat, sans-serif;
    font-style: italic;
    font-weight: 900;
  }
  a {
    color: #00fbffcf;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const PolicyCheck = styled.div`
  input {
    background-color: #00fbffcf;
  }
`;
const Wallet = styled.div`
  padding: 2rem;
  width: 100%;
  position: relative;
  @media only screen and (max-width: 500px) {
    & {
      padding: 1rem;
    }
  }
`;
const IconWallet = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: space-evenly;
  pointer-events: ${(props) => props.dis};
  @media only screen and (max-width: 500px) {
    & {
      justify-content: space-around;
    }
  }
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 18%;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.5s ease 0s;
  span {
    transition: all 0.5s ease 0s;
  }
  span.coinbase {
    margin-top: 9px;
  }
  &:hover {
    background: ${(props) => props.check};
    span {
      color: #00fbffcf;
    }
  }
  @media only screen and (max-width: 500px) {
    & {
      font-size: 13px;
    }
  }
`;
const ContentIcon = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 10px;
  a {
    color: #00fbffcf;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  @media only screen and (max-width: 500px) {
    & {
      font-size: 13px;
      margin-top: 1rem;
    }
  }
`;
const NavHeader = styled.div`
  width: 100%;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  background-color: ${(props) => props.col};
  position: sticky;
  z-index: 5;
  transition: all 0.5s ease-out;
  top: 0;
  left: 0;
  padding: 1em;
  @media only screen and (max-width: 500px) {
    & {
      padding: 10px;
    }
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  z-index: 2;
  width: 100%;
  margin: 0 auto;
  @media only screen and (max-width: 935px) {
    & {
      margin: 0;
      padding: 0;
    }
  }
  @media only screen and (max-width: 600px) {
    & {
      height: 40px;
    }
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    height: 75px;
  }
  @media only screen and (max-width: 935px) {
    img {
      height: 65px;
    }
  }
  @media only screen and (max-width: 800px) {
    img {
      height: 55px;
    }
  }
  @media only screen and (max-width: 675px) {
    img {
      height: 45px;
    }
  }
  @media only screen and (max-width: 645px) {
    img {
      height: 35px;
    }
  }
  @media only screen and (max-width: 500px) {
    img {
      height: 25px;
    }
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
const Account = styled.div`
  display: ${(props) => props.acc};
  cursor: pointer;
  padding: 0 20px;
  @media only screen and (max-width: 500px) {
    & {
      padding: 0;
    }
  }
`;
export const Button = styled.div`
  padding: 7px;
  justify-content: center;
  color: rgb(255, 255, 255);
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  font-size: 16px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
  @media only screen and (max-width: 500px) {
    & {
      padding: 5px;
      font-size: 12px;
      border-radius: 8px;
    }
  }
`;
const AccountConnect = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  white-space: nowrap;
  cursor: pointer;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  @media only screen and (max-width: 500px) {
    font-size: 12px;
    border-radius: 6px;
  }
`;
const ButtonAccount = styled.div`
  font-weight: 500;
  padding: 6px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid rgb(20 235 212);
  background-position: center right;
  background-size: 100% !important;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  transition: all 0.5s ease-in-out 0s;
  &:hover {
    background-position: left center;
    background-size: 200% !important;
  }
  @media only screen and (max-width: 500px) {
    padding: 4px;
    border-radius: 6px;
  }
`;
const Network = styled.div`
  display: flex;
  gap: 5px;
  font-style: italic;
`;
const Balance = styled.div`
  display: flex;
  gap: 5px;
  font-style: italic;
  padding-left: 5px;
  align-items: center;
  @media only screen and (max-width: 370px) {
    display: none;
  }
`;
const BalanceFBS = styled.div`
  margin-right: 12px;
  @media only screen and (max-width: 1024px) {
    & {
      display: none;
    }
  }
`;
const ButtonEth = styled.div`
  margin-right: 12px;
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  background-position: center right;
  background-size: 100%;
  transition: all 0.5s ease-in-out 0s;
  padding: 7px;
  border-radius: 10px;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    & {
      display: none;
    }
  }
  &:hover {
    background-size: 200%;
    background-position: left center;
  }
`;
const IconMenu = styled.div`
  background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
    rgb(0, 20, 38);
  border: 1px solid rgb(20 235 212);
  background-position: center right;
  background-size: 100%;
  border-radius: 10px;
  margin-left: 12px;
  width: 38px;
  height: 38px;
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease-in-out 0s;
  display: none;
  &:hover {
    background-size: 200%;
    background-position: left center;
  }
  &:hover .line-1 {
    width: 12px;
    transition: all 0.5s ease-in-out 0s;
  }
  &:hover .line-3 {
    width: 16px;
    transition: all 0.5s ease-in-out 0s;
  }
  @media only screen and (max-width: 1040px) {
    & {
      display: block;
    }
  }
  @media only screen and (max-width: 500px) {
    & {
      margin-left: 5px;
      width: 28px;
      height: 28px;
      border-radius: 6px;
    }
    &:hover .line-1 {
      width: 7px;
      transition: all 0.5s ease-in-out 0s;
    }
    &:hover .line-3 {
      width: 10px;
      transition: all 0.5s ease-in-out 0s;
    }
  }
`;
const Line = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 3px;
  background-color: white;
  border-radius: 10px;
  &:first-child {
    transform: translate(-50%, -10px);
  }
  &:last-child {
    transform: translate(-50%, 7px);
  }
  @media only screen and (max-width: 500px) {
    & {
      margin-left: 5px;
      width: 14px;
      height: 2px;
      position: absolute;
      left: 30%;
    }
    &:first-child {
      transform: translate(-50%, -6px);
    }
    &:last-child {
      transform: translate(-50%, 4px);
    }
  }
`;

export default memo(Nav);
