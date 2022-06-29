import React, { useEffect, useState } from "react";
import nitro from "./Background/nitro.png";
import armor from "./Background/armor.png";
import engine from "./Background/engine.png";
import styled from "styled-components";
import mistery from "./Background/mistery.png";
import BoxItem from "./BoxItem";
import ModalBox from "./ModalBox";
import jetwings from "./Background/jetwing.png";

const Sideitem = () => {
  const wings = {
    url: jetwings,
    name: "Wings Box",
    nameNFT: "ss1_JetWing",
    price: "1,000",
  };
  const nitros = {
    url: nitro,
    name: "Nitro Box",
    nameNFT: "ss1_NitroTank",
    price: "2,000",
  };
  const armors = {
    url: armor,
    name: "Armor Box",
    nameNFT: "ss1_CarbonAmor",
    price: "3,000",
  };
  const engines = {
    url: engine,
    name: "Engine Box",
    nameNFT: "ss1_Engine",
    price: "4,000",
  };
  const misterys = {
    url: mistery,
    name: "Mistery Box",
    price: "5,000",
  };

  return (
    <Container>
      <CreatesMain>
        <CategoryList>
          <CategoryItem className="active">All</CategoryItem>
          <CategoryItem>Jet Wings</CategoryItem>
          <CategoryItem>Nitro Tank</CategoryItem>
          <CategoryItem>Carbon Armor</CategoryItem>
          <CategoryItem>Engine</CategoryItem>
        </CategoryList>
        <BoxList>
          <BoxItem item={wings} />
          <BoxItem item={nitros} />
          <BoxItem item={armors} />
          <BoxItem item={engines} />
          <BoxItem item={misterys} />
        </BoxList>
        <ModalBox />
      </CreatesMain>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  @media only screen and (max-width: 770px) {
    flex-wrap: wrap;
  }
`;
const CreatesMain = styled.div`
  padding: 32px;
  width: 100%;
  @media only screen and (max-width: 935px) {
    padding: 16px;
  }
  @media only screen and (max-width: 500px) {
    padding: 10px;
  }
`;
const CategoryList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;
const CategoryItem = styled.div`
  padding: 6px 20px;
  border: 2px solid #757575;
  border-radius: 10px;
  background: linear-gradient(
    117.45deg,
    rgba(255, 255, 255, 0) -3.91%,
    rgba(255, 255, 255, 0.039) 75.27%
  );
  transition: all 0.5s ease-in 0s;
  cursor: pointer;
  &:hover,
  &.active {
    background: linear-gradient(to left, rgb(0, 4, 254), rgb(0, 195, 254))
      rgb(0, 20, 38);
  }
  @media only screen and (max-width: 500px) {
    & {
      padding: 4px 16px;
      font-size: 13px;
    }
  }
`;
const BoxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  @media only screen and (max-width: 520px) {
    & {
      gap: 15px;
    }
  }
  @media only screen and (max-width: 500px) {
    & {
      gap: 20px;
    }
  }
  @media only screen and (max-width: 570px) {
    & {
      justify-content: center;
    }
  }
`;
export default React.memo(Sideitem);
