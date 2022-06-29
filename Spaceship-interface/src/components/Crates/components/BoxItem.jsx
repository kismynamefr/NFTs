import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FBStoken from "../../Nav/components/Icon/FBStoken";

const BoxItem = ({item}) => {
  return (
    <Link
      to={`/Crates/${item.name}`}
      state={item}
      data-item="Detailbox"
      style={{ textDecoration: "none", color: "#fff" }}
    >
      <BoxItems>
        <ItemImg>
          <img src={item.url} />
        </ItemImg>
        <ItemHeader>{item.name}</ItemHeader>
        <ItemPrice>
          <p>Sell price</p>
          <Price>
            <FBStoken width={18} height={18} />
            <p>{item.price}</p>
          </Price>
        </ItemPrice>
      </BoxItems>
    </Link>
  );
};
const BoxItems = styled.div`
  cursor: pointer;
  padding: 1rem;
  transition: all 0.5s ease-out;
  background: linear-gradient(
    117.45deg,
    rgba(255, 255, 255, 0) -3.91%,
    rgba(255, 255, 255, 0.039) 75.27%
  );
  border-radius: 20px;
  backdrop-filter: blur(42px);
  &:hover {
    transform: scale(1.1);
  }
`;
const ItemImg = styled.div`
  padding: 10px 25px;
  border: 2px solid #757575;
  border-radius: 10px;
  background: linear-gradient(
    117.45deg,
    rgba(255, 255, 255, 0) -3.91%,
    rgba(255, 255, 255, 0.039) 75.27%
  );
  backdrop-filter: blur(42px);
  img {
    height: 18vh;
    width: 18vh;
  }
  @media only screen and (max-width: 683px) {
    img {
      height: 14vh;
      width: 14vh;
    }
  }
`;
const ItemHeader = styled.div`
  margin: 10px 0;
  @media only screen and (max-width: 500px) {
    & {
      font-size: 13px;
    }
  }
`;
const ItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  @media only screen and (max-width: 500px) {
    & {
      font-size: 13px;
    }
  }
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default BoxItem;
