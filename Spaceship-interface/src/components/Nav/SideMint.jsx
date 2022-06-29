import React, { memo, useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import Toast from "../Toast/Toast";
import Spinner from "../Market/components/Spinner";
import axios from "axios";
import useAPI from "../../API";
import spaceship4 from "../Market/components/img/spaceship4.jpeg";
import useProvider from "../../Provider";
import { useWeb3React } from "@web3-react/core";

const Sidemint = ({ account, sideMint, setSideMint }) => {
  const web3 = new Web3(Web3.givenProvider);
  const { API } = useAPI();
  const { chainId } = useWeb3React();
  const { Provider } = useProvider();
  const [URI, setURI] = useState(spaceship4);
  const [isSpinner, setIsSpinner] = useState(false);
  const [formValues, setFormValues] = useState({ 
    name: "",
    price: "",
    type: "",
    itemOfContract: "",
  });

  function makeRandomSerials(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleURI = (e) => {
    const result = e.target.value;
    setURI(result);
  };
  const handleClose = () => {
    setSideMint(false);
  };
  const convertNumber = (amount, decimals) => {
    const BN = web3.utils.BN;
    const amountToken = (
      Number(amount) *
      10 ** Number(decimals)
    ).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const number = new BN(amountToken).toString();
    return number;
  };

  const isMint = async () => {
    setIsSpinner(true);
    const idLoading = Toast("loading", "Mint NFT Pending, Please wait...");
    await Provider(chainId, formValues.itemOfContract).then(
      async ({ NFTsMarket, ADDRESS_CONTRACT }) => {
        const NFTsList = await NFTsMarket.methods.fetchMarketItems().call();
        let quantity = NFTsList[NFTsList.length - 1]?.tokenId;
        if (!quantity) quantity = 0;
        const balanceFix = convertNumber(formValues.price, 18);
        const serial = makeRandomSerials(10);
        const tx = NFTsMarket.methods
          .mintNFTs(URI, balanceFix, formValues.name, formValues.type, serial)
          .encodeABI();
        const NFTsdata = {
          from: account,
          to: ADDRESS_CONTRACT,
          data: tx,
        };
        try {
          await web3.eth.sendTransaction(NFTsdata).then(async (res) => {
            await API(chainId).then(async (url) => {
              await setIsSpinner(false);
              await Toast(
                "update success",
                "Mint NFT was successful, Please check Market Place",
                idLoading
              );
              await axios({
                method: "post",
                url: url,
                data: {
                  id: `${++quantity}`,
                  uri: URI,
                  name: formValues.name,
                  price: formValues.price,
                  owner: ADDRESS_CONTRACT,
                  type: formValues.type,
                  serial: serial,
                  hasSelled: false,
                },
              });
            });
          });
        } catch (error) {
          setIsSpinner(false);
          Toast(
            "update reject",
            "Mint NFT was rejected. Please try again",
            idLoading
          );
          console.log(error);
        }
      }
    );
  };

  return (
    <>
      <Opacity onClick={handleClose} />
      <MintSide>
        <Container>
          <MainBody>
            <h2>MINT NFTS</h2>
            <form action="submit">
              <p>
                <span>*</span> Required fields
              </p>
              <h4>
                Image, Video, Audio, or 3D Model <span>*</span>
              </h4>
              <p>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </p>
              <ImageNFT
                uri={URI ? "none" : "3px dashed rgb(204, 204, 204)"}
                src={`${URI}`}
              />
              <h4>
                Select an item of contract <span>*</span>
              </h4>
              <Options
                onChange={handleForm}
                name="itemOfContract"
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Select an item
                </option>
                <option value="Wings">Wings</option>
                <option value="Nitro">Nitro</option>
                <option value="Armor">Armor</option>
                <option value="Engine">Engine</option>
              </Options>
              <h4>
                External link <span>*</span>
              </h4>
              <Input>
                <input
                  onChange={handleURI}
                  type="text"
                  name="externalLink"
                  placeholder="https://yourNFTs.info/item/123"
                />
              </Input>
              <p>
                SpaceFintech will include a link to this URL on this item's
                detail page, so that users can click to learn more about it. You
                are welcome to link to your own webpage with more details.
              </p>
              <h4>
                Name <span>*</span>
              </h4>
              <InputName>
                <Input>
                  <input
                    onChange={handleForm}
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </Input>
              </InputName>
              <h4>
                Price <span>*</span>
              </h4>
              <InputPrice>
                <Input>
                  <input
                    onChange={handleForm}
                    type="number"
                    name="price"
                    placeholder="Price"
                  />
                </Input>
              </InputPrice>
              <h4>
                Type <span>*</span>
              </h4>
              <Options
                onChange={handleForm}
                name="type"
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Select type of item
                </option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Options>
            </form>
          </MainBody>
          {isSpinner ? (
            <DisabledButtonMint className="Mint">
              <Spinner />
            </DisabledButtonMint>
          ) : (
            <ButtonMint className="Mint" onClick={isMint}>
              Mint
            </ButtonMint>
          )}

          <ButtonClose onClick={handleClose}>X</ButtonClose>
        </Container>
      </MintSide>
    </>
  );
};
const Opacity = styled.div`
  display: ${(props) => props.dis};
  position: fixed;
  inset: 0px;
  z-index: 1;
  opacity: 1;
  transition: opacity 0.3s ease-in-out 0s;
  background-color: rgba(0, 0, 0, 0.35);
`;
const MintSide = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: 560px;
  z-index: 2;
  overflow: auto;
  height: calc((100% - 0px) - 130px);
  background: white;
  color: black;
  border: 1px solid rgb(229, 232, 235);
  border-radius: 10px;
  filter: drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px);
  visibility: visible;
  transform: translate3d(0, 0px, 0px);
  opacity: 1;
  transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  h2 {
    font-weight: 600;
    font-size: 30px;
    letter-spacing: 0px;
    color: rgb(4, 17, 29);
    display: flex;
    justify-content: center;
  }
`;
const MainBody = styled.div`
  font-family: Poppins, sans-serif;
  form {
    display: flex;
    flex-flow: column;
    gap: 10px;
    p {
      font-weight: 500;
      font-size: 12px;
      color: rgb(112, 122, 131);
    }
    span {
      color: rgb(235, 87, 87);
      font-size: 18px;
    }
  }
`;
const ImageNFT = styled.img`
  position: relative;
  padding: 4px;
  cursor: pointer;
  border: ${(props) => props.uri};
  border-radius: 10px;
  height: 300px;
  object-fit: cover;
`;
const Input = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 1px solid rgb(229, 232, 235);
  display: flex;
  position: relative;
  input {
    background-color: transparent;
    border: none;
    flex: 1 0 0%;
    height: 48px;
    outline: none;
    padding: 0px 15px 0px 20px;
    min-width: 0px;
  }
`;
const InputName = styled.div``;
const InputPrice = styled.div``;

const ButtonMint = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 20px;
  background-color: rgb(32, 129, 226);
  border: 1px solid rgb(32, 129, 226);
  color: rgb(255, 255, 255);
  &:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(24, 104, 183);
  }
`;
const DisabledButtonMint = styled.div`
  cursor: not-allowed;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 20px;
  background-color: rgb(4 27 50);
  color: rgb(255, 255, 255);
`;
const ButtonClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: 12px 20px;
  color: rgb(32, 129, 226);
  transition: color 0.1s linear 0.1s;
  &:hover {
    color: black;
  }
`;
const Options = styled.select`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 1px solid rgb(229, 232, 235);
  display: flex;
  height: 48px;
  padding: 0px 15px 0px 20px;
`;
export default memo(Sidemint);
