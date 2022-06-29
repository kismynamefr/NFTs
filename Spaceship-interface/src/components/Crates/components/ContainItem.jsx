import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import axios from "axios";
import useAPI from "../../../API";

const ContainItem = ({ dataBox }) => {
  const [data, setData] = useState([]);
  const { API } = useAPI();
  const { chainId } = useWeb3React();

  const fetchItem = () => {
    if (!chainId) return;
    API(chainId).then(async (url) => {
      await axios({
        method: "get",
        url: `${url}/nameNFTs/${dataBox.nameNFT}`,
      }).then((res) => {
        const ids = res.data.map((o) => o.type);
        const filtered = res.data.filter(
          ({ type }, index) => !ids.includes(type, index + 1)
        );
        setData(filtered);
      });
    });
  };
  const mapItem = () => {
    return data.map((res, index) => (
      <Item key={index}>
        <ImgItem>
          <img src={res.uri} />
        </ImgItem>
        <NameItem>{res.name}</NameItem>
        <p>Type: {res.type}</p>
      </Item>
    ));
  };
  useEffect(() => {
    fetchItem();
    return () => {
      setData([]);
    };
  }, [chainId]);

  return mapItem();
};
const Item = styled.div`
  padding: 1rem;
  border: 2px solid #757575;
  border-radius: 20px;
  p {
    font-size: 13px;
  }
`;
const ImgItem = styled.div`
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  @media only screen and (max-width: 575px) {
    img {
      width: 150px;
      height: 150px;
    }
  }
  @media only screen and (max-width: 500px) {
    img {
      width: 120px;
      height: 120px;
    }
  }
`;
const NameItem = styled.div`
  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

export default ContainItem;
